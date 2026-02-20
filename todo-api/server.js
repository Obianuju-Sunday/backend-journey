const express = require("express");
const pool = require("./db")
const app = express();
const PORT = 3000;
app.use(express.json());


// Root route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "My backend journey starts now"
  });
});

// todos route

app.get("/todos", (req, res) => {
  pool.query("SELECT * FROM todos ORDER BY id", (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      })
    } else {
      return res.status(200).json(result.rows)
    }
  })
})

app.post("/todos", (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body cannot be empty."
    })
  }
  const { title, completed } = req.body;
  const trimmedTitle = title?.trim();

  // Validation check before hitting the DB
  if (!trimmedTitle || trimmedTitle.length === 0) {
    return res.status(404).json({
      error: "Title is required and can't be empty."
    })
  }
  if (trimmedTitle.length > 255) {
    return res.status(400).json({
      error: "Title too long."
    })
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({
      error: "Is completed is required and must be a boolean variable"
    })
  }

  pool.query("INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *", [trimmedTitle, completed], (err, result) => {
    if (err) {
      console.error("Database Error;", err);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      })
    } else {
      return res.status(201).json(result.rows[0])
    }
  })
})


app.get("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);

  // Validation check for ID before hitting the DB
  if (Number.isNaN(todoID)) {
    return res.status(400).json({
      error: "Invalid ID format"
    })
  }

  if (!Number.isInteger(todoID) || todoID <= 0) {
    return res.status(400).json({
      error: "ID must be a positive integer."
    })
  }

  pool.query("SELECT * FROM todos WHERE id = $1", [todoID], (err, result) => {
    if (err) {
      console.error("Database Error;", err);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Todo not found."
      })
    }
    return res.status(200).json(result.rows[0])
  })
})


app.put("/todos/:id", (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body cannot be empty."
    })
  }
  const { title, completed } = req.body;
  const trimmedTitle = title?.trim();
  const todoID = Number(req.params.id);

  if (Number.isNaN(todoID)) {
    return res.status(400).json({
      error: "Invalid ID format"
    })
  }

  if (!Number.isInteger(todoID) || todoID <= 0) {
    return res.status(400).json({
      error: "ID must be a positive integer"
    })
  }

  if (!trimmedTitle || trimmedTitle.length === 0) {
    return res.status(400).json({
      error: "Title is required and can't be empty."
    });
  }

  if (trimmedTitle.length > 255) {
    return res.status(400).json({
      error: "Title too long."
    })
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({
      error: "Completed must be a boolean!"
    })
  }

  pool.query("UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [title, completed, todoID], (err, result) => {
    if (err) {
      console.error("Database Error;", err);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Todo not found."
      })
    }
    return res.status(200).json({
      message: "Todo updated successfully.",
      updatedTodo: result.rows[0]
    })
  })
})

app.delete("/todos/:id", (req, res) => {
  const todoID = Number(req.params.id);

  // Validation check for ID before hitting the DB
  if (Number.isNaN(todoID)) {
    return res.status(400).json({
      error: "Invalid ID format"
    })
  }

  if (!Number.isInteger(todoID) || todoID <= 0) {
    return res.status(400).json({
      error: "ID must be a positive integer."
    })
  }

  pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [todoID], (err, result) => {
    if (err) {
      console.error("Database Error;", err);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      })
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Todo not found."
      })
    }
    return res.status(200).json({
      message: "Todo deleted successfully.",
      deletedTodo: result.rows[0]
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});