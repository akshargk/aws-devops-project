const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary data
let tasks = [
  {
    id: 1,
    title: "Learn AWS",
    completed: false,
  },
  {
    id: 2,
    title: "Build REST API",
    completed: true,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 AWS DevOps Task Manager API is running!");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
