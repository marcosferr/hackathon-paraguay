const { Pool } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

async function updateDatabase() {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  // Create a new pool
  const pool = new Pool({
    connectionString: "process.env.DATABASE_URL",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, "../lib/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Updating database schema...");

    // Execute the schema
    await pool.query(schema);

    console.log("Database schema update completed successfully!");
  } catch (error) {
    console.error("Error updating database schema:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateDatabase();
