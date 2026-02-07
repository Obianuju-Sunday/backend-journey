const express = require('express');
const app = express();
app.use(express.json());

// TODO: Create a route to get all todos
var todos = [
  {
    id: 1,
    title: 'Buy groceries',
    isCompleted: false
  },
  {
    id: 2,
    title: 'Walk the dog',
    isCompleted: true
  },
  {
    id: 3,
    title: 'Read a book',
    isCompleted: false
  },
  {
    id: 4,
    title: 'Write code/ Do day 2 challenge of my backend glow up journey',
    isCompleted: true
  }
]


app.post('/todos', (req, res) => {
  const { title, isCompleted } = req.body;
  const newId = todos.length + 1;
  const newTodo = {
    id: newId,
    title,
    isCompleted
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
})

app.get('/todos/:id', (req, res) => {
  const todoID = req.params.id;
  const convertedTodoID = Number(todoID);
  console.log(convertedTodoID);
  const todoIndex = todos.find(todo => todo.id === convertedTodoID);
  if (todoIndex) {
    res.status(200).json(todoIndex)
  } else {
    res.status(404).json('Todo not found')
  }
})

app.put('/todos/:id', (req, res) => {
  const { title, isCompleted } = req.body;
  const todoID = req.params.id;
  const convertedID = Number(todoID);
  const todoIndex = todos.find(todo => todo.id === convertedID);
  if (todoIndex) {
    todoIndex.title = title;
    todoIndex.isCompleted = isCompleted;
    res.status(200).json(todoIndex);
  } else {
    res.status(404).json('Todo not found')
  }
})

app.delete('/todos/:id', (req, res) => {
  const todoID = req.params.id;
  const convertedID = Number(todoID);
  const todoIndex = todos.findIndex(todo => todo.id === convertedID);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.status(200).json("Todo deleted successfully");
  } else {
    res.status(404).json('Todo not found')
  }
})











// Root route
app.get('/', (req, res) => {
  res.json({ message: 'My backend journey starts now' });
});

// todos route
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});