import fetch from "node-fetch";
import { formatResults } from "./formatResults.js";
import dotenv from "dotenv";
dotenv.config();
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
  //First fetch to get list of results:
  const result = await Promise.all([
    fetch(`${API_URL}filter.php?c=Seafood`),
    fetch(`${API_URL}filter.php?c=Beef`),
    fetch(`${API_URL}filter.php?c=Chicken`),
    fetch(`${API_URL}filter.php?c=Vegetarian`),
    fetch(`${API_URL}filter.php?c=Goat`),
    fetch(`${API_URL}filter.php?c=Lamb`),
    fetch(`${API_URL}filter.php?c=Pasta`),
    fetch(`${API_URL}filter.php?c=Vegan`),
  ]);

  let promises = [];
  for (let i in result) {
    const newResult = await result[i].json();
    promises.push(newResult.meals);
  }

  let recipeArray = promises.flat();
  if (recipeArray.length === 0) {
    return [];
  } else {
    let randomResult = Math.floor(Math.random() * recipeArray.length);
    const randomRecipe = recipeArray[randomResult].idMeal;

    //Second fetch to get individual random result full recipe:
    const finalRandomRecipe = await (
      await fetch(`${API_URL}lookup.php?i=${randomRecipe}`)
    ).json();

    const selectedMeal = finalRandomRecipe.meals[0];
    return formatResults([selectedMeal]);
  }
}

// This is the fetch for random breakfast

//GET RANDOM BREAKFAST
async function getRandomBreakfast() {
  const result = await (await fetch(`${API_URL}filter.php?c=Breakfast`)).json();
  if (result.length === 0) {
    return [];
  } else {
    let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

    //Second fetch to get individual random result full breakfast recipe:
    const randomBreakfastId = result.meals[randomResult].idMeal;
    const finalRandomRecipe = await (
      await fetch(`${API_URL}lookup.php?i=${randomBreakfastId}`)
    ).json();

    const selectedMeal = finalRandomRecipe.meals[0];
    return formatResults([selectedMeal]);
  }
}

//GET RANDOM DESSERT
async function getRandomDessert() {
  const result = await (await fetch(`${API_URL}filter.php?c=Dessert`)).json();
  if (result.length === 0) {
    return [];
  } else {
    let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

    //Second fetch to get individual random result full dessert recipe:
    const randomDessertId = result.meals[randomResult].idMeal;
    const finalRandomRecipe = await (
      await fetch(`${API_URL}lookup.php?i=${randomDessertId}`)
    ).json();

    const selectedMeal = finalRandomRecipe.meals[0];
    return formatResults([selectedMeal]);
  }
}
