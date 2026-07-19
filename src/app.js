const express = require("express");
const pool = require("./config/db");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 AWS DevOps Task Manager API is running!");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Get task by ID
app.get("/tasks/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Create task
app.post("/tasks", async (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed ?? false]
    );

    res.status(201).json({
      message: "Task created successfully",
      task: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
      task: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
