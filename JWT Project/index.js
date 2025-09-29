const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")

const JWT_SECRET = "vinayaklovealia";

app.use(express.json());

const users = [];

function logger (req, res, next) {
    console.log(`${req.method} request came`);
    next();
}

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/public/index.html")
// })

app.use(express.static("./public"))

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (users.find(u => u.username === username)) {
        res.json({
            message: "You already have an account"
        });
        return;
    }

    users.push({
        username,
        password
    });
    res.send({
        message: "You have signed up"
    })
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET);

        // user.token = token;
        res.send({
            token
        });
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        });
    }
});

function auth (req, res, next) {
    const token = req.headers.authorization;
    
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    }
}

app.get("/me", auth, (req, res) => {  
    const token = req.headers.authorization;
    const userDetails = jwt.verify(token, JWT_SECRET);

    const username = userDetails.username;
    const user = users.find(user => user.username === username);

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})


app.listen(3000)

