const pool = require("./src/config/db");

async function testConnection() {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testConnection();

