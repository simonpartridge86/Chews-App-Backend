import { query } from "../index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const MEALDB_URL = process.env.MEALDB_URL;

async function populateIngredientsTable() {
  const ingredientsData = await fetch(`${MEALDB_URL}list.php?i=list"`);
  const result = await ingredientsData.json();
  let ingrList = [];
  result.meals.map(async (ingr) => {
    ingrList.push(ingr.strIngredient);
  });
  fetchMealsByIngredient(ingrList);
}
async function fetchMealsByIngredient(ingrList) {
  for (const ingredient of ingrList) {
    const result = await fetch(`${MEALDB_URL}filter.php?i=${ingredient}`);
    const data = await result.json();
    if (!data.meals || data.meals.length === 0) {
      const mealId = null;
      const dataReturn = await query(
        `INSERT INTO ingredients_new(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [ingredient, mealId]
      );
      console.log("Updated with null:", dataReturn.rows[0].name);
    } else {
      let mealIds = [];
      data.meals.map(async (ingr) => {
        mealIds.push(ingr.idMeal);
      });
      const dataReturn = await query(
        `INSERT INTO ingredients_new(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [ingredient, mealIds.join(",")]
      );
      console.log("Updated with value:", dataReturn.rows[0].name);
    }
  }
  console.log("POPULATED ingredients table");
}

populateIngredientsTable();
