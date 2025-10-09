let todos = []; // in-memory
let currentId = 1;

// GET all todos
export async function getAllTodo(req, res) {
  res.json(todos);
}

// CREATE a new todo
export async function createTodo(req, res) {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const newTodo = { id: currentId++, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
}

// UPDATE a todo (task text or completed status)
export async function updateTodo(req, res) {
  const { id } = req.params;
  const { task, completed } = req.body; // allow either field to be updated

  const todoIndex = todos.findIndex((todo) => todo.id == id);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // Only update fields that are provided
  if (task !== undefined) todos[todoIndex].task = task;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  res.json(todos[todoIndex]);
}

// DELETE all todos (optional)
export async function deleteTodo(req, res) {
  todos = [];
  currentId = 1;
  res.status(204).send();
}

// DELETE todo by ID
export async function deleteTodoById(req, res) {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
}

// SEARCH todos by query
export async function searchTodo(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Query parameter missing" });
  }

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filteredTodos);
}
