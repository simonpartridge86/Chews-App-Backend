//https://www.themealdb.com/api/json/v2/9973533/filter.php?i=chicken_breast,garlic,salt

// //FILTER MEALS BY INGREDIENTS AND GET LIST OF FULL RECIPES
// export async function getMealByIngredients(ingredients) {
//   //FIRST FETCH
//   const data = await fetch(
//     `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`
//   );
//   const result = await data.json();
//   //SECOND FETCH
//   const promises = result.meals.map(async (meal) => {
//     let id = meal.idMeal;
//     const newUrl = await fetch(
//       `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
//     );
//     const result = await newUrl.json();
//     return result.meals[0];
//   });
//   const finality = await Promise.all(promises);
//   return finality;
// }

//FILTER MEAL BY INGREDIENT AND CATEGORY
export async function filterMealByAreaAndCategory(ingredients, category) {
  console.log("arguments:", ingredients, category);

  let searchCategory;
  if (category === "main") {
    searchCategory = [salmon, pork, etc];
  } else if (category === "breakfast") {
    searchCategory = [breakfast];
  } else if (category === "dessert") {
    searchCategory = [dessert];
  }

  //FIRST FETCH FOR RECIPES THAT MATCH INGREDIENTS
  const data = await fetch(
    `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`
  );
  const result = await data.json();
  //SECOND FETCH TO RETURN ONLY RECIPES THAT HAVE THE REQUIRED CATEGORY
  let promises = [];
  for (let i in await result.meals) {
    let id = result.meals[i].idMeal;
    const newUrl = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
    );
    const newResult = await newUrl.json();
    console.log(newResult);
    if (newResult.meals[0].strCategory === category) {
      promises.push(newResult.meals[0]);
    }
  }
  const finality = await Promise.all(promises);
  return finality;
}

/*  PLAN:
    - Adjust above functionality to allow for meal choice (Breakfast, main, dessert):
      - ingredient search returns meal ID - create array of IDs for matching meals.
      - search each meal by ID and check categories.
      - if category matches our required meal type, then add meal to our response object.
*/
