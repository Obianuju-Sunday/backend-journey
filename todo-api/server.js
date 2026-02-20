const express = require("express");
const pool = require("./db")
const app = express();
const PORT = 3000;
app.use(express.json());


// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "My backend journey starts now"
  });
});

// todos route

app.get("/todos", (req, res) => {
  pool.query("SELECT * FROM todos ORDER BY id", (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message
      })
    } else {
      res.status(200).json(result.rows)
    }
  })
})

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title || typeof completed !== 'boolean') {
    res.status(400).json({
      message: "Both fields are required."
    })
  }

  pool.query("INSERT INTO todos (title, is_completed) VALUES ($1, $2) RETURNING *", [title, completed], (err, result) => {

    if (err) {
      res.status(500).json({
        error: err.message
      })
    } else {
      res.status(201).json(result.rows[0])
    }
  })
})


app.get("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);

  pool.query("SELECT * FROM todos WHERE id = $1", [todoID], (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message
      })
    }
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "Todo not found."
      })
    }
    res.status(200).json(result.rows[0])
  })
})


app.put("/todos/:id", (req, res) => {
  const { title, completed } = req.body;
  const todoID = Number(req.params.id);

  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({
      message: "Title and completed are required"
    });
  }

  pool.query("UPDATE todos SET title = $1, is_completed = $2 WHERE id = $3 RETURNING *", [title, completed, todoID], (err, result) => {
    if(err){
      res.status(500).json({
        error: err.message
      });
    }
    if(result.rows.length === 0){
      res.status(404).json({
        message: "Todo not found."
      })
    }
    res.status(200).json({
      message: "Todo updated successfully.",
      updatedTodo: result.rows[0]
  })
  })
})

app.delete("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);

  pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [todoID], (err, result) => {
    if(err){
      res.status(500).json({
        error: err.message
      })
    }
    if(result.rows.length === 0){
      res.status(404).json({
        message: "Todo not found."
      })
    }
    res.status(200).json({
      message: "Todo deleted successfully.",
      deletedTodo: result.rows[0]
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});