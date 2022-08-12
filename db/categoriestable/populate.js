import { query } from "../index.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const MEALDB_URL = process.env.MEALDB_URL;

async function populateCategoriesTable() {
  const categoriesData = await fetch(`${MEALDB_URL}list.php?c=list`);
  const result = await categoriesData.json();
  let catList = [];
  result.meals.map(async (cat) => {
    catList.push(cat.strCategory);
  });
  fetchMealsByCategory(catList);
}
async function fetchMealsByCategory(catList) {
  for (const category of catList) {
    const result = await fetch(`${MEALDB_URL}filter.php?c=${category}`);
    const data = await result.json();
    if (!data.meals || data.meals.length === 0) {
      const mealId = null;
      const dataReturn = await query(
        `INSERT INTO meal_categories(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [category, mealId]
      );
      console.log("Updated with null:", dataReturn.rows[0].name);
    } else {
      let mealIds = [];
      data.meals.map(async (meal) => {
        mealIds.push(meal.idMeal);
      });
      const dataReturn = await query(
        `INSERT INTO meal_categories(name, mealindex) VALUES ($1,$2) RETURNING name;`,
        [category, mealIds.join(",")]
      );
      console.log("Updated with value:", dataReturn.rows[0].name);
    }
  }
  createMainCategory();
}

async function createMainCategory() {
  const dataReturn =
    await query(`SELECT (mealindex) FROM meal_categories WHERE name = 'Beef' OR name = 'Chicken' OR name = 'Goat'
    OR name = 'Lamb' OR name = 'Miscellaneous' OR name = 'Pasta' OR name = 'Pork' OR name = 'Seafood'
    OR name = 'Starter' OR name = 'Side' OR name = 'Vegan' OR name = 'Vegetarian';`);
  let mainIdsArray = [];
  dataReturn.rows.map(async (cat) => {
    mainIdsArray.push(cat.mealindex);
  });
  const mainIds = mainIdsArray.join(",");
  const mainReturn = await query(
    `INSERT INTO meal_categories(name, mealindex) VALUES ('Main',$1) RETURNING name;`,
    [mainIds]
  );
  console.log("Updated with value:", mainReturn.rows[0].name);
  console.log("POPULATED categories table");
}

populateCategoriesTable();
