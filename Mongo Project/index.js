const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");   
const { z, email } = require("zod");

mongoose.connect("mongodb+srv://vinayakmore0:v!nayakM20@cluster0.gsimec7.mongodb.net/todo-app-database");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100)
        .refine((val) => /[A-Z]/.test(val), { error: "Must include an uppercase letter" })
        .refine((val) => /[a-z]/.test(val), { error: "Must include a lowercase letter" })
        .refine((val) => /[^A-Za-z0-9]/.test(val), { error: "Must include a special character" }),
        name: z.string().min(3).max(100)
    })
    // const pasredData = requiredBody.parse(req.body);
    const pasredData = requiredBody.safeParse(req.body);
    if (!pasredData.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: pasredData.error
        })
    }

    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
        });

        res.json({
            message: "You are signed up"
        })
    } catch(e) {
        res.status(500).json({
            message: "Error while signing up"
        })  
    } 
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        
        res.json({
            token
        });
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        });
    }
});

app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    });
});

app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;  

    const todos = await TodoModel.find({
        userId
    }).populate('userId').exec();

    res.json({
        todos
    });
});


app.listen(3000);

