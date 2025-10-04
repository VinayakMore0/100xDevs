const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { Todo, User } = require("../database");
const router = Router();

// todo Routes
router.post("/", userMiddleware, async (req, res) => {
  // Implement todo creation logic
  const { Category, Title, Description, Type, Date } = req.body;

  const todo = await Todo.create({
    Category,
    Title,
    Description,
    Type,
    Date,
  });

  await User.findOneAndUpdate(
    { username: req.username },
    { $push: { todos: todo._id } },
    { new: true, upsert: true }
  );

  res.json({ message: "Todo created successfully", todo });
});

router.put("/:id", userMiddleware, async (req, res) => {
  // Implement update todo  logic
  const { id } = req.params;
  const updates = req.body;

  const todo = await Todo.findOneAndUpdate({ _id: id }, updates, { new: true });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo updated successfully", todo });
});

router.delete("/", userMiddleware, async (req, res) => {
  // Implement delete todo logic
});

router.delete("/:id", userMiddleware, async (req, res) => {
  // Implement delete todo by id logic
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  await User.findOneAndUpdate(
    { username: req.username },
    { $pull: { todos: id } }
  );

  res.json({ message: "Todo deleted successfully" });
});

router.get("/", userMiddleware, async (req, res) => {
  // Implement fetching all todo logic
  const user = await User.findOne({ username: req.username }).populate("todos");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ todos: user.todos });
});

router.get("/:id", userMiddleware, async (req, res) => {
  // Implement fetching todo by id logic
  const { id } = req.params;
  
  const todo = await Todo.findById(id);
  if (!todo) return res.status(404).json({ message: "Todo not found"});

  res.json({ todo })
});

module.exports = router;
