import fetch from 'node-fetch';

/* GRAND UNIFIED SEARCH FUNCTION
- router to expect a form of
 https://chews-backend.herokuapp.com/full-recipe-search?ingredients={onion,garlic,...}&category={main}&diets={vegetarian,gluten_free,...}&area={italian}
- Different processes depending on if different parameters are defined
- Ingredient search called first to narrow down options
  - Only concise list given by MealDB so go through each by id to get full details
- Filter the ingredients in each resulting recipe for the diets parameter list based on database results
  - Each dietary requirement is true if suitable for diet, false otherwise
  - The dietary requirements will need to be separated out first by splice method?
- Finally, check the strArea for each recipe still in the results array (ie not filtered out)
  - Any area element (again separated out by string method) provided is enough for the recipe to pass
- If no result is provided, prompt to provide less detailed search
  - Restrict results to 5 for frontend
*/

/* REVISED PLAN
- Dietary requirements will initially restricted to vegan, vegetarian, seafood
  - These accessed by mealdb categorisation - you may choose only one
  - This means that this should be dealt with first if there is a diets parameter defined
  - And if there is one defined, category is skipped?
- Only one cuisine area may be chosen - this can be next chosen
- Category as in previous functions
*/

// Add filters
export async function getMealComplete(ingredients, category, diets, area) {
    console.log("arguments:", ingredients, category, diets, area);
    if(!category) {
      return {success: false, code: 400,
        message: 'Not enough search parameters defined. If you are seeing this in the Chews App, please contact The Baristacrats support'};
    } else if (diets) {
      let selectionArray1 = dietarySelection(diets);
      let selectionArray2 = ingredientsSelection(selectionArray1, ingredients);
      return areaSelection(selectionArray2, area);
    } else if (ingredients) {
      let selectionArray1 = categorySelection(category);
      let selectionArray2 = ingredientsSelection(selectionArray1, ingredients);
      return areaSelection(selectionArray2, area);
    } else if (area) {
      let selectionArray1 = categorySelection(category);
      return areaSelection(selectionArray1);
    } else {
      return categorySelection(category);
    }

}
















    
/*let searchCategory;
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
      console.log(newResult);
      if (searchCategory.includes(newResult.meals[0].strCategory)) {
        promises.push(newResult.meals[0]);
      }
    }
    const finality = await Promise.all(promises);
    return finality[0];
  */