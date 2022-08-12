import { query } from "../index.js";

// Construct a table with meal categories and corresponding IDs

async function createCategoriesTable() {
  const sqlstring = `CREATE TABLE IF NOT EXISTS meal_categories (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, mealindex TEXT);`;
  const res = await query(sqlstring);
  console.log(res.command, "Table created");
}

createCategoriesTable();
