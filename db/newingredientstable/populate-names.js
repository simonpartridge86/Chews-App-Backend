import { query } from "../index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const ingredientsData = await fetch(
  process.env.MEALDB_URL + "/list.php?i=list"
);
const result = await ingredientsData.json();

export async function populateIngredientsTable() {
  for (let i in await result.meals) {
    const res = await query(
      `INSERT INTO ingredients(name) VALUES ($1) RETURNING*;`,
      [result.meals[i].strIngredient]
    );
    console.log(res.rows[0].name, "inserted");
  }
}

populateIngredientsTable();
