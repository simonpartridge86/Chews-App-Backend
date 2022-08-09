import fetch from 'node-fetch';

/* GRAND UNIFIED SEARCH FUNCTION
- router to expect a form of
 https://chews-backend.herokuapp.com/full-recipe-search?ingredients={onion,garlic,...}&category={main}&diets={vegetarian,gluten_free,...}&area={italian}
- Different processes depending on if different parameters are defined
- Ingredient search called first to narrow down options
  - Only concise list given by MealDB so go through each by id to get full details
- Filter the ingredients in each resulting recipe for the diets parameter list based on database results
  - ACTUALLY DO THIS FIRST
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

export async function getRecipesFromSummaries(summaryArray) {
  console.log("STARTED");
  console.log(summaryArray);
  let promises = [];
  for (let i in summaryArray) {
    //let id = summaryArray[i].idMeal;
    let id = summaryArray[i].idMeal;
    //console.log(id);
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
    //promises.push(newResult.meals[0]);
    promises.push(newResult.meals[0]);
  }
  const resultsArray = await Promise.all(promises);
  console.log(resultsArray[0]);
  return resultsArray;
}

export async function dietarySelection(diets) {
  let summaryArray = [];
  // No breaks, so that the earlier cases do the later case logic too
  switch(diets) {
    case 'seafood':
      const data1 = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=seafood`
      );
      const result1 = await data1.json();
      summaryArray.push(result1.meals);
      console.log(summaryArray[0]);
    case 'vegetarian':
      const data2 = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=vegetarian`
      );
      const result2 = await data2.json();
      summaryArray.push(result2.meals);
    case 'vegan':
      const data3 = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=vegan`
      );
      const result3 = await data3.json();
      summaryArray.push(result3.meals);
  }
  //console.log(summaryArray);
  const resultsArray = getRecipesFromSummaries(summaryArray.flat());
  return resultsArray
}

export async function categorySelection(category) {
  console.log('Category is', category);
  let result;
  if (category === 'Main') {
    result = await Promise.all([
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Seafood"),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Beef"),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Chicken"),
      fetch(
        "https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Vegetarian"
      ),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Goat"),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Lamb"),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Pasta"),
      fetch("https://www.themealdb.com/api/json/v2/9973533/filter.php?c=Vegan"),
    ]);
  } else if (category === 'Dessert' || category === 'Breakfast') {
    result = await Promise.all([
      fetch(`https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${category}`)
    ]);
  } else {
    console.log('ERROR OCCURED: category of ', category, ' not defined');
    return [];
  }
  let summaryArray = [];
  for (let i in result) {
    const newResult = await result[i].json();
    //console.log(await newResult);
    summaryArray.push(newResult.meals);
  }
  // Now process the summary data into a workable structure
  const newResultsArray = getRecipesFromSummaries(summaryArray.flat());
  //console.log(Object.keys(newResultsArray[0]));
  
  return newResultsArray
}



async function ingredientsSelection(resultsArray, ingredients) {
  let newResultsArray = [];
  let chosenIngredients = ingredients.split(",");
  
  for (let i=0; i<resultsArray.length; i++) {
    console.log()
  }
  return newResultsArray
}

async function areaSelection(resultsArray, area) {
  return newResultsArray
}

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