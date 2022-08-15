import { query } from "../index.js";

async function dropCategoriesTable() {
  await query("DROP TABLE IF EXISTS meal_categories;");
  console.log("Table deleted");
}

dropCategoriesTable();
