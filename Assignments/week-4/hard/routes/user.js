const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../database/index");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
  });
  res.json({
    message: "User created successfully",
  });
});

router.post("/login", async (req, res) => {
  // Implement user login logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      message: "Login Successful", token
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and pass",
    });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  // Implement logic for getting todos for a user
  const user = await User.findOne({ username: req.username }).populate("todos");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ todos: user.todos });
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
  res.json({
    message: "Logged out successfully. Please clear token on client side.",
  });
});

module.exports = router;
