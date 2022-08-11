import fetch from "node-fetch";
import { formatResults } from "./formatResults.js";

//GET RANDOM MEAL

export async function getRandomMeal(category) {
  if (category === "main") {
    return await getRandomMainMeal();
  } else if (category === "breakfast") {
    return await getRandomBreakfast();
  } else if (category === "dessert") {
    return await getRandomDessert();
  }
  return;
}

// GET RANDOM MAIN
async function getRandomMainMeal() {
  //First fetch to get list of results:
  const result = await Promise.all([
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Seafood"),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Beef"),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Chicken"),
    fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Vegetarian"
    ),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Goat"),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Lamb"),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Pasta"),
    fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Vegan"),
  ]);

  let promises = [];
  for (let i in result) {
    const newResult = await result[i].json();
    promises.push(newResult.meals);
  }

  let recipeArray = promises.flat();
  if (recipeArray.length === 0) {
    return null;
  } else { 
  let randomResult = Math.floor(Math.random() * recipeArray.length);
  const randomRecipe = recipeArray[randomResult].idMeal;

  //Second fetch to get individual random result full recipe:
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomRecipe}`
    )
  ).json();

  const selectedMeal = finalRandomRecipe.meals[0];
  return formatResults([selectedMeal]);
  }
}

// This is the fetch for random breakfast

//GET RANDOM BREAKFAST
async function getRandomBreakfast() {
  const result = await (
    await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Breakfast"
    )
  ).json();
  if (recipeArray.length === 0) {
    return null;
  }
  else{
  let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

  //Second fetch to get individual random result full breakfast recipe:
  const randomBreakfastId = result.meals[randomResult].idMeal;
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomBreakfastId}`
    )
  ).json();

  const selectedMeal = finalRandomRecipe.meals[0];
  return formatResults([selectedMeal]);
  }
}

//GET RANDOM DESSERT
async function getRandomDessert() {
  const result = await (
    await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Dessert"
    )
  ).json();
  if (recipeArray.length === 0) {
    return null;
  }
  else{
  let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

  //Second fetch to get individual random result full dessert recipe:
  const randomDessertId = result.meals[randomResult].idMeal;
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomDessertId}`
    )
  ).json();

  const selectedMeal = finalRandomRecipe.meals[0];
  return formatResults([selectedMeal]);
  }
}
