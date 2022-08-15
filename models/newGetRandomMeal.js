import fetch from "node-fetch";
import { query } from "../db/index.js";
import dotenv from "dotenv";
dotenv.config();

import { formatResults } from "./formatResults.js";

const API_URL = process.env.MEALDB_URL;

//GET RANDOM MEAL

export async function getRandomMeal(category) {
  if (category === "main") {
    console.log("Search Random: Main");
    return await getRandomMainMeal();
  } else if (category === "breakfast") {
    console.log("Search Random: Breakfast");
    return await getRandomBreakfast();
  } else if (category === "dessert") {
    console.log("Search Random: Dessert");
    return await getRandomDessert();
  }
  return;
}

// GET RANDOM MAIN
async function getRandomMainMeal() {
  //Gets all meal IDs for main from Heroku database
  const data = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = 'Main';`
  );
  const result = data.rows[0].mealindex;
  const indexArray = result.split(",");
  const randomNum = Math.floor(Math.random() * indexArray.length);
  const randomMainIndex = indexArray[randomNum];

  //Runs one fetch to get random main recipe
  const randomMain = await (
    await fetch(`${API_URL}lookup.php?i=${randomMainIndex}`)
  ).json();

  const selectedMeal = randomMain.meals[0];
  return formatResults([selectedMeal]);
}

// This is the fetch for random breakfast

//GET RANDOM BREAKFAST
async function getRandomBreakfast() {
  //Gets all meal IDs for breakfast from Heroku database
  const data = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = 'Breakfast';`
  );
  const result = data.rows[0].mealindex;
  const indexArray = result.split(",");
  const randomNum = Math.floor(Math.random() * indexArray.length);
  const randomBreakfastIndex = indexArray[randomNum];

  //Runs one fetch to get random main recipe
  const randomBreakfast = await (
    await fetch(`${API_URL}lookup.php?i=${randomBreakfastIndex}`)
  ).json();

  const selectedMeal = randomBreakfast.meals[0];
  return formatResults([selectedMeal]);
}

//GET RANDOM DESSERT
async function getRandomDessert() {
  //Gets all meal IDs for dessert from Heroku database
  const data = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = 'Dessert';`
  );
  const result = data.rows[0].mealindex;
  const indexArray = result.split(",");
  const randomNum = Math.floor(Math.random() * indexArray.length);
  const randomDessertIndex = indexArray[randomNum];

  //Runs one fetch to get random main recipe
  const randomDessert = await (
    await fetch(`${API_URL}lookup.php?i=${randomDessertIndex}`)
  ).json();

  const selectedMeal = randomDessert.meals[0];
  return formatResults([selectedMeal]);
}
