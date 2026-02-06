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


app.post('/todos', (req,res) => {
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

















// Root route
app.get('/', (req, res) => {
  res.json({ message: 'My backend journey starts now' });
});

// todos route
app.get('/todos', (req,res) => {
    res.json(todos);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});