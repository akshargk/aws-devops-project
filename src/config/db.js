const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "taskmanager",
  password: process.env.DB_PASSWORD || "postgres123",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
