import fetch from 'node-fetch';

/* GRAND UNIFIED SEARCH FUNCTION
- router to expect a form of
 https://chews-backend.herokuapp.com/full-recipe-search?ingredients={onion,garlic,...}&category={main}&diets={vegetarian,gluten_free,...}&areas={italian,american}
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

// Add filters
export async function getMealComplete(ingredients, category, diets, areas) {
    console.log("arguments:", ingredients, category, diets, areas);
    
    if (ingredients && category && diets && areas) {
        return []
    } else if (ingredients && category) {
        return []
    } else if (category && diets && areas){
        return []
    } else if (category) {
        return []
    } else{
        return {success: false, code: 400,
             message: 'Not enough search parameters defined. If you are seeing this in the Chews App, please contact The Baristacrats support'}
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