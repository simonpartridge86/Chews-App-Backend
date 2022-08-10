import { mealRan } from "../libs/random-recipes.js";
import express, { Router } from "express";
import {
  filterMealByIngredients,
  filterMealByArea,
  filterMealByCategory,
  ingredientList,
  filterMealByAreaAndCategory,
} from "../models/index.js";
import { getIngredientsBySearch } from "../models/getIngredients.js";
import {
  getRandomMainMeal,
  getRandomBreakfast,
  getRandomDessert,
} from "../models/random.js";
import { categorySelection, dietarySelection, ingredientsSelection, areaSelection, getMealComplete } from '../models/fullSearch.js';

const recipesRouter = express.Router();

recipesRouter.get("/recipes", async function (req, res) {
  const responseObject = { success: true, payload: mealRan };
  res.json(responseObject);
});

recipesRouter.get("/random/main", async function (req, res) {
  const result = await getRandomMainMeal();
  const responseObject = { success: true, payload: result };
  res.json(responseObject.payload);
});

recipesRouter.get("/random/breakfast", async function (req, res) {
  const result = await getRandomBreakfast();
  const responseObject = { success: true, payload: result };
  res.json(responseObject.payload);
});

recipesRouter.get("/random/dessert", async function (req, res) {
  const result = await getRandomDessert();
  const responseObject = { success: true, payload: result };
  res.json(responseObject.payload);
});

recipesRouter.get("/test-searches", async function (req, res) {
  /*const recipeArray = [
    {
    "idMeal": "52772",
    "strMeal": "Teriyaki Chicken Casserole",
    "strDrinkAlternate": null,
    "strCategory": "Chicken",
    "strArea": "Japanese",
    "strInstructions": "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    "strTags": "Meat,Casserole",
    "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    "strIngredient1": "soy sauce",
    "strIngredient2": "water",
    "strIngredient3": "brown sugar",
    "strIngredient4": "ground ginger",
    "strIngredient5": "minced garlic",
    "strIngredient6": "cornstarch",
    "strIngredient7": "chicken breasts",
    "strIngredient8": "stir-fry vegetables",
    "strIngredient9": "brown rice",
    "strIngredient10": "",
    "strIngredient11": "",
    "strIngredient12": "",
    "strIngredient13": "",
    "strIngredient14": "",
    "strIngredient15": "",
    "strIngredient16": null,
    "strIngredient17": null,
    "strIngredient18": null,
    "strIngredient19": null,
    "strIngredient20": null,
    "strMeasure1": "3/4 cup",
    "strMeasure2": "1/2 cup",
    "strMeasure3": "1/4 cup",
    "strMeasure4": "1/2 teaspoon",
    "strMeasure5": "1/2 teaspoon",
    "strMeasure6": "4 Tablespoons",
    "strMeasure7": "2",
    "strMeasure8": "1 (12 oz.)",
    "strMeasure9": "3 cups",
    "strMeasure10": "",
    "strMeasure11": "",
    "strMeasure12": "",
    "strMeasure13": "",
    "strMeasure14": "",
    "strMeasure15": "",
    "strMeasure16": null,
    "strMeasure17": null,
    "strMeasure18": null,
    "strMeasure19": null,
    "strMeasure20": null,
    "strSource": null,
    "strImageSource": null,
    "strCreativeCommonsConfirmed": null,
    "dateModified": null
    }
    ];*/
  const result = await getMealComplete('Onion', 'Main', 'Seafood', 'Spanish');
  const responseObject = { success: true, payload: result };
  res.json(responseObject.payload);
});

recipesRouter.get("/filtered/:id", async function (req, res) {
  const filters = req.params.id;
  const result = await filterMealByIngredients(filters);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
  //console.log(responseObject)
});

recipesRouter.get("/ingredients-list/:id", async function (req, res) {
  const searchTerm = String(req.params.id);
  const result = await getIngredientsBySearch(searchTerm);
  const responseObject = { success: true, payload: result };
  res.json(responseObject);
  console.log(responseObject);
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
