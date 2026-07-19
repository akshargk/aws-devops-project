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

// Create a new task
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created successfully",
    task: newTask,
  });
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json({
    message: "Task updated successfully",
    task,
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
