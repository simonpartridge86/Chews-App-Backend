import fetch from "node-fetch";
import { query } from "../db/index.js";
import { formatResults } from "./formatResults.js";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.MEALDB_URL;

//FILTERS MEAL BY INGREDIENT AND CATEGORY
export async function getMealByIngredients(ingredients, category) {
  console.log("Ingredients:", ingredients);
  console.log("Category:", category);

  const searchCategory = category[0].toUpperCase() + category.substring(1);
  const ingredientsArray = ingredients.split(",");

  //GETS NESTED ARRAY OF MEAL IDS CORRESPONDING TO EACH INGREDIENT FROM DATABASE
  let ingIds = [];
  for (const ing of ingredientsArray) {
    const formattedIng = ing
      .split(" ")
      .map((e) => e[0].toUpperCase() + e.substring(1))
      .join(" ");
    const ingData = await query(
      `SELECT (mealindex) FROM ingredients_new WHERE name = '${formattedIng}';`
    );
    ingIds.push(ingData.rows[0].mealindex.split(","));
    console.log(formattedIng, ingData.rows[0].mealindex.split(","));
  }

  //FINDS MEAL IDS IN NESTED ARRAY COMMON TO ALL INGREDIENTS
  const filteredIngIds = ingIds.shift().filter(function (a) {
    return ingIds.every(function (b) {
      return b.indexOf(a) !== -1;
    });
  });

  //GETS ARRAY OF MEAL IDS CORRESPONDING TO THE CATEGORY
  const catData = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = '${searchCategory}';`
  );

  const catIds = catData.rows[0].mealindex.split(",");

  //COMPARES INGREDIENT AND CATEGORY IDS TO FIND COMMON MEAL IDS

  let finalIds = filteredIngIds.filter((value) => catIds.includes(value));

  //IF MATCHES ARE FOUND, A RANDOM ID IS SEARCHED TO RETURN A MEAL

  if (finalIds.length > 0) {
    const randomNum = Math.floor(Math.random() * finalIds.length);
    const randomIndex = finalIds[randomNum];
    const result = await fetch(`${API_URL}lookup.php?i=${randomIndex}`);
    const data = await result.json();
    console.log("Number of results:", finalIds.length);
    return formatResults(data.meals);
  } else {
    return [];
  }
}
