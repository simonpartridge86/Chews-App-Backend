import { query } from "../index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export async function getIngredients(searchTerm) {
  const result = await ingredientPool.query(
    `SELECT * FROM ingredients WHERE
  LOWER(name) LIKE LOWER($1||'%') LIMIT 5;`,
    [searchTerm]
  );
  let ingrList = [];
  result.rows.map(async (ingr) => {
    ingrList.push(ingr.name);
  });

  let finality = await Promise.all(ingrList);

  if (finality.length > 0) {
    return finality;
  } else {
    return [];
  }
}

const ingredientsData = await fetch(
  process.env.MEALDB_URL + "/list.php?i=list"
);
const result = await ingredientsData.json();

export async function populateIngredientsTable() {
  for (let i in await result.meals) {
    const res = await query(
      `INSERT INTO ingredients_new(name) VALUES ($1) RETURNING*;`,
      [result.meals[i].strIngredient]
    );
    console.log(res.rows[0].name, "inserted");
  }
}

populateIngredientsTable();
