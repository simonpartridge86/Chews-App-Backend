import express, { Router } from "express";
import { getMealByIngredients } from "../models/getMealByIngredients.js";
import { getIngredients } from "../models/getIngredients.js";
import { getRandomMeal } from "../models/getRandomMeal.js";
import {
  filterMealByAreaAndCategory,
  filterMealByArea,
  filterMealByCategory,
} from "../models/getRandomMealByAreaAndCategory.js";

const recipesRouter = express.Router();

//FETCHES INGREDIENTS FOR INGREDIENTS SELECTION PAGE
recipesRouter.get("/ingredients-list/:id", async function (req, res) {
  const searchTerm = String(req.params.id);
  const result = await getIngredients(searchTerm);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

//FETCHES RANDOM MEAL FOR RESULTS PAGE
recipesRouter.get("/random-meal", async function (req, res) {
  const mealType = String(req.query.meal);
  const result = await getRandomMeal(mealType);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

//FETCHES MEALS ACCORDING TO INGREDIENTS AND MEAL CATEGORY
recipesRouter.get("/ingredients-category", async function (req, res) {
  const ingredients = String(req.query.ingredients);
  const category = String(req.query.category);
  const result = await getMealByIngredients(ingredients, category);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
});

// FETCHES MEALS ACCORDING TO AREA AND MEAL CATEGORY
recipesRouter.get("/area-category", async function (req, res) {
  const area = req.query.area;
  const category = req.query.category;
  console.log("Area:", area);
  console.log("Category:", category);
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
