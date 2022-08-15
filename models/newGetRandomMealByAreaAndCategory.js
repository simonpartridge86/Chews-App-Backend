import fetch from "node-fetch";
import { query } from "../db/index.js";
import { formatResults } from "./formatResults.js";
import dotenv from "dotenv";
dotenv.config();
const API_URL = process.env.MEALDB_URL;

//FILTER MEAL BY AREA AND BY CATEGORY
export async function filterMealByAreaAndCategory(area, category) {
  //GET MEAL IDS FOR AREA FROM DATABASE
  const formattedArea = area[0].toUpperCase() + area.substring(1);
  const areaData = await query(
    `SELECT (mealindex) FROM meal_areas WHERE name = '${formattedArea}';`
  );
  const areaIds = areaData.rows[0].mealindex.split(",");

  //GET MEAL IDS FOR CATEGORY FROM DATABASE
  const formattedCat = category[0].toUpperCase() + category.substring(1);
  const catData = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = '${formattedCat}';`
  );
  const catIds = catData.rows[0].mealindex.split(",");

  let finalIds = areaIds.filter((value) => catIds.includes(value));

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

export async function filterMealByArea(area) {
  //GET MEAL IDS FOR AREA FROM DATABASE
  const formattedArea = area[0].toUpperCase() + area.substring(1);
  const areaData = await query(
    `SELECT (mealindex) FROM meal_areas WHERE name = '${formattedArea}';`
  );
  const areaIds = areaData.rows[0].mealindex.split(",");

  //IF MATCHES ARE FOUND, A RANDOM ID IS SEARCHED TO RETURN A MEAL
  if (areaIds.length > 0) {
    const randomNum = Math.floor(Math.random() * areaIds.length);
    const randomIndex = areaIds[randomNum];
    const result = await fetch(`${API_URL}lookup.php?i=${randomIndex}`);
    const data = await result.json();
    console.log("Number of results:", areaIds.length);
    return formatResults(data.meals);
  } else {
    return [];
  }
}

export async function filterMealByCategory(category) {
  //GET MEAL IDS FOR CATEGORY FROM DATABASE
  const formattedCat = category[0].toUpperCase() + category.substring(1);
  const catData = await query(
    `SELECT (mealindex) FROM meal_categories WHERE name = '${formattedCat}';`
  );
  const catIds = catData.rows[0].mealindex.split(",");

  //IF MATCHES ARE FOUND, A RANDOM ID IS SEARCHED TO RETURN A MEAL
  if (catIds.length > 0) {
    const randomNum = Math.floor(Math.random() * catIds.length);
    const randomIndex = catIds[randomNum];
    const result = await fetch(`${API_URL}lookup.php?i=${randomIndex}`);
    const data = await result.json();
    console.log("Number of results:", catIds.length);
    return formatResults(data.meals);
  } else {
    return [];
  }
}
