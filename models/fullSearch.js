import fetch from 'node-fetch';

/* GRAND UNIFIED SEARCH FUNCTION
- 4 filter parameters: 
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