import fetch from "node-fetch";
import { formatResults } from "./formatResults.js";
import dotenv from "dotenv";
dotenv.config();
const API_URL = process.env.MEALDB_URL;

//FILTER MEAL BY AREA AND BY CATEGORY
export async function filterMealByAreaAndCategory(area, category) {
  //FIRST FETCH
  const data = await fetch(`${API_URL}filter.php?a=${area}`);
  const result = await data.json();
  //SECOND FETCH
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(`${API_URL}lookup.php?i=${id}`);
    const newResult = await newUrl.json();
    if (newResult.meals[0].strCategory === category) {
      promises.push(newResult.meals[0]);
    }
  }
  const finality = await Promise.all(promises);
  console.log("Number of results:", finality.length);
  if (finality.length > 0) {
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
  } else {
    return [];
  }
}

export async function filterMealByArea(area) {
  const data = await fetch(`${API_URL}filter.php?a=${area}`);
  const result = await data.json();
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(`${API_URL}lookup.php?i=${id}`);
    const newResult = await newUrl.json();
    promises.push(newResult.meals[0]);
  }
  const finality = await Promise.all(promises);
  console.log("Number of results:", finality.length);
  if (finality.length > 0) {
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
  } else {
    return [];
  }
}

export async function filterMealByCategory(category) {
  const data = await fetch(`${API_URL}filter.php?c=${category}`);
  const result = await data.json();
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(`${API_URL}lookup.php?i=${id}`);
    const newResult = await newUrl.json();
    promises.push(newResult.meals[0]);
  }
  const finality = await Promise.all(promises);
  console.log("Number of results:", finality.length);
  if (finality.length > 0) {
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
  } else {
    return [];
  }
}
