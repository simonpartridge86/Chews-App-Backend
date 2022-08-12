import { query } from "../index.js";

// Construct a table with meal areas and corresponding IDs

async function createAreasTable() {
  const sqlstring = `CREATE TABLE IF NOT EXISTS meal_areas (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, mealindex TEXT);`;
  const res = await query(sqlstring);
  console.log(res.command, "Table created");
}

createAreasTable();
