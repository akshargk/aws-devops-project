const express = require("express");

const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("🚀 AWS DevOps Task Manager API is running!");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
