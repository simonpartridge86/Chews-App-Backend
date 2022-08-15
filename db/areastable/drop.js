import { query } from "../index.js";

async function dropAreasTable() {
  await query("DROP TABLE IF EXISTS meal_areas;");
  console.log("Table deleted");
}

dropAreasTable();
