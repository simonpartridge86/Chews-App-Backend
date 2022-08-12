import { query } from "../index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const MEALDB_URL = process.env.MEALDB_URL;

async function populateAreasTable() {
  const areasData = await fetch(`${MEALDB_URL}list.php?a=list`);
  const result = await areasData.json();
  let areaList = [];
  result.meals.map(async (area) => {
    areaList.push(area.strArea);
  });
  fetchMealsByArea(areaList);
}
async function fetchMealsByArea(areaList) {
  for (const area of areaList) {
    const result = await fetch(`${MEALDB_URL}filter.php?a=${area}`);
    const data = await result.json();
    if (!data.meals || data.meals.length === 0) {
      const mealId = null;
      const dataReturn = await query(
        `INSERT INTO meal_areas(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [area, mealId]
      );
      console.log("Updated with null:", dataReturn.rows[0].name);
    } else {
      let mealIds = [];
      data.meals.map(async (meal) => {
        mealIds.push(meal.idMeal);
      });
      const dataReturn = await query(
        `INSERT INTO meal_areas(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [area, mealIds.join(",")]
      );
      console.log("Updated with value:", dataReturn.rows[0].name);
    }
  }
  console.log("POPULATED areas table");
}

populateAreasTable();
