const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(DB_URL);

// Define schemas

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

const TodoSchema = new mongoose.Schema({
  Category: {
    type: String,
    enum: ["Todo", "In Progress", "Under Review", "Finished"],
    required: true,
  },
  Title: { type: String, required: true },
  Description: { type: String },
  Type: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
