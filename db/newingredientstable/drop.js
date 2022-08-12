import { query } from "../index.js";

export async function dropIngredientsTable() {
  await query("DROP TABLE IF EXISTS ingredients_new;");
  console.log("Table deleted");
}

dropIngredientsTable();
