import fetch from "node-fetch";

//GET RANDOM MAIN MEAL

//First fetch to get list of results:
export async function getRandomMainMeal() {
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

  let randomResult = Math.floor(Math.random() * result.length);
  const randomRecipe = promises.flat()[randomResult].idMeal;
  console.log(randomRecipe);

  //Second fetch to get individual random result full recipe:
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomRecipe}`
    )
  ).json();
  return finalRandomRecipe.meals[0];
}

// This is the fetch for random breakfast

export async function getRandomBreakfast() {
  const result = await (
    await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Breakfast"
    )
  ).json();

  let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

  //Second fetch to get individual random result full breakfast recipe:
  const randomBreakfastId = result.meals[randomResult].idMeal;
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomBreakfastId}`
    )
  ).json();

  return finalRandomRecipe.meals[0];
}

export async function getRandomDessert() {
  const result = await (
    await fetch(
      "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Dessert"
    )
  ).json();

  let randomResult = Math.floor(Math.random() * result.meals.length); // calculate random index

  //Second fetch to get individual random result full dessert recipe:
  const randomDessertId = result.meals[randomResult].idMeal;
  const finalRandomRecipe = await (
    await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${randomDessertId}`
    )
  ).json();

  return finalRandomRecipe.meals[0];
}
