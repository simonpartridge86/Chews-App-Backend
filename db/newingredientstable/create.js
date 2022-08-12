import { query } from "../index.js";

// Constructs a table with ingredients and corresponding meal IDs

async function createIngredientsTable() {
  const sqlstring = `CREATE TABLE IF NOT EXISTS ingredients_new (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, mealindex TEXT);`;
  const res = await query(sqlstring);
  console.log(res.command, "table created");
}

createIngredientsTable();
