import { query } from "../index.js";

// Construct a table with ingredient name and dietary preference columns

export async function createIngredientsTable() {
  const sqlstring = `CREATE TABLE IF NOT EXISTS ingredients-new (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT mealIDs NUMBER []);`;
  const res = await query(sqlstring);
  console.log(res.command, "table created");
}

createIngredientsTable();
