const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());


const todos = [
  {
    id: 1,
    title: "Buy groceries",
    isCompleted: false
  },
  {
    id: 2,
    title: "Walk the dog",
    isCompleted: true
  },
  {
    id: 3,
    title: "Read a book",
    isCompleted: false
  },
  {
    id: 4,
    title: "Write code/ Do day 2 challenge of my backend glow up journey",
    isCompleted: true
  }
]

// Root route
app.get("/", (req, res) => {
  res.json({ message: "My backend journey starts now" });
});

// todos route
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
})

app.get("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);
  const todo = todos.find(todo => todo.id === todoID);
  if (todo) {
    res.status(200).json(todo)
  } else {
    res.status(404).json({ message: "Todo not found" })
  }
})

app.post("/todos", (req, res) => {
  const { title, isCompleted } = req.body;
  if(!title  || typeof isCompleted !== 'boolean') {
    return res.status(400).json({ message: "Title and isCompleted are required" });
  }
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1; 
  const newTodo = {
    id: newId,
    title,
    isCompleted
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
})

app.put("/todos/:id", (req, res) => {
  const { title, isCompleted } = req.body;
  if(!title  || typeof isCompleted !== 'boolean') {
    return res.status(400).json({ message: "Title and isCompleted are required" });
  }
  const todoID = Number(req.params.id);
  const todo = todos.find(todo => todo.id === todoID);
  if (todo) {
    todo.title = title;
    todo.isCompleted = isCompleted;
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
})

app.delete("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoID);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});