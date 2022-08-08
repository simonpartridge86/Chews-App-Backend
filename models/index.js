import express from "express";
import fetch from "node-fetch";
import { pool as ingredientPool } from '../db/index.js';


//FILTER MEALS BY INGREDIENTS AND GET LIST OF FULL RECIPES
export async function filterMealByIngredients(filters) {
  //FIRST FETCH
  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${filters}`
  );
  const result = await data.json();
  //SECOND FETCH
  const promises = result.meals.map(async (meal) => {
    let id = meal.idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const result = await newUrl.json();
    return result.meals[0];
  });
  const finality = await Promise.all(promises);
  return finality;
}

//FILTER MEAL BY AREA AND BY CATEGORY
export async function filterMealByAreaAndCategory(area, category) {
  console.log("arguments:", area, category);
  //FIRST FETCH
  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?a=${area}`
  );
  const result = await data.json();
  //SECOND FETCH
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
    console.log(newResult);
    if (newResult.meals[0].strCategory === category) {
      promises.push(newResult.meals[0]);
    }
  }
  const finality = await Promise.all(promises);
  return finality;
}

/* PLAN AREA and CUISINE TYPE FILTERS
- Make filter by area and category function
  - Fetch url that brings short forms of all in specified area
  - Then, iterate over the response
    - For each mealid value, fetch the full recipe on it
    - If the specified category matches that in the full recipe, add full recipe to our promises array
    - If not, just move on
    - We may need to Promise.all on each iteration
  - Promise.all(promises) at the end if not required in iterations
  - return the array, but null results removed 
*/

//ENTIRE INGREDIENTS LIST
export async function ingredientList() {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const result = await data.json();
  let ingrList = [];
  result.meals.map(async (ingr) => {
    ingrList.push(ingr.strIngredient);
  });
  return Promise.all(ingrList);
}

export async function ingredientDatabaseList() {
const result = await ingredientPool.query('SELECT name FROM ingredients;');
let ingrList = [];
  result.rows.map(async (ingr) => {
    ingrList.push(ingr.name);
  });
return Promise.all(ingrList);
}


export async function filterMealByArea(area) {

  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?a=${area}`
  );
  const result = await data.json();
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
      promises.push(newResult.meals[0]);
  }
  const finality = await Promise.all(promises);
  return finality;
}

export async function filterMealByCategory(category) {

  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${category}`
  );
  const result = await data.json();
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
      promises.push(newResult.meals[0]);
  }
  const finality = await Promise.all(promises);
  return finality;
}

