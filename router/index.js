import express, { Router } from "express";

import {
  filterMealByArea,
  filterMealByCategory,
  filterMealByAreaAndCategory,
} from "../models/index.js";
import { getIngredients } from "../models/getIngredients.js";
import { getMealByIngredients } from "../models/getMealByIngredients.js";
import { getRandomMeal } from "../models/getRandomMeal.js";

const recipesRouter = express.Router();

recipesRouter.get("/random-meal", async function (req, res) {
  const mealType = String(req.query.meal);
  const result = await getRandomMeal(mealType);
  const responseObject = { success: true, payload: [result] };
  res.json(responseObject);
});

// recipesRouter.get("/filtered/:id", async function (req, res) {
//   const filters = req.params.id;
//   const result = await filterMealByIngredients(filters);
//   const responseObject = { success: true, payload: result };
//   res.json(responseObject);
//   //console.log(responseObject)
// });

recipesRouter.get("/ingredients-list/:id", async function (req, res) {
  const searchTerm = String(req.params.id);
  const result = await getIngredients(searchTerm);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
  console.log(responseObject);
});

recipesRouter.get("/ingredients-category", async function (req, res) {
  const ingredients = String(req.query.ingredients);
  const category = String(req.query.category);
  console.log(`Ingredients, category, ${ingredients}, ${category}`);
  const result = await getMealByIngredients(ingredients, category);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

/*
recipesRouter.get('/area/:id', async function (req, res){
  const area = req.params.id
  const result = await filterMealByAreaAndCategory(area);
  const responseObject = {success: true, payload: result};
  res.json(responseObject);
  //console.log(responseObject)
})
*/

//Button for categories
//Choose Seafood
//Search...
//Look for the function that requests only categories as only a category is present in the request
//function get 'url/catgeory/seafood'

//[area:Spain, category:seafood]
//url.com/area=spain&category=seafood

//[area:Spain, category:seafood]
//Button for area & category:
//Choose Spain & Seafood
//Click search
//oh, there is both an 'area' and a 'catgory' in the users choice
//look for the function that fetches both category and area
// run function get 'url.com/area-category

recipesRouter.get("/area-category", async function (req, res) {
  const area = req.query.area;
  const category = req.query.category;
  console.log(area);
  if (area && category) {
    const result = await filterMealByAreaAndCategory(area, category);
    const responseObject = { success: true, payload: result };
    res.json(responseObject);
  } else if (area) {
    const result = await filterMealByArea(area);
    const responseObject2 = { success: true, payload: result };
    res.json(responseObject2);
  } else if (category) {
    const result = await filterMealByCategory(category);
    const responseObject3 = { success: true, payload: result };
    res.json(responseObject3);
  }
});

export { recipesRouter };
