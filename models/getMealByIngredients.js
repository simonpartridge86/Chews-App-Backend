import fetch from "node-fetch";
import { formatResults } from "./formatResults.js";


//FILTER MEAL BY INGREDIENT AND CATEGORY
export async function getMealByIngredients(ingredients, category) {
  console.log("Ingredients:", ingredients);
  console.log("Category:", category);

  let searchCategory;
  if (category === "main") {
    searchCategory = [
      "Seafood",
      "Beef",
      "Chicken",
      "Vegetarian",
      "Goat",
      "Lamb",
      "Pasta",
      "Vegan",
    ];
  } else if (category === "breakfast") {
    searchCategory = ["breakfast"];
  } else if (category === "dessert") {
    searchCategory = ["dessert"];
  }

  //FIRST FETCH FOR RECIPES THAT MATCH INPUT INGREDIENTS
  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`
  );
  const result = await data.json();

  //SECOND FETCH TO RETURN ONLY ONE RECIPE THAT HAS THE REQUIRED CATEGORY/CATEGORIES
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
    if (searchCategory.includes(newResult.meals[0].strCategory)) {
      promises.push(newResult.meals[0]);
    }
  }
  const finalResult = await Promise.all(promises);
  console.log("Number of results:", finalResult.length);
  if (finalResult.length > 0) {
    return formatResults(finalResult);
  } else {
    return null
  }
  
}
