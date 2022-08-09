//FORMATS RESULTS FOR FRONTEND

export function formatResults(meals) {
  const filteredMeals = meals.map((mealObject) => {
    //formats meal name to be capitalized
    const formattedName = mealObject.strMeal
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase() + e.substr(1))
      .join(" ");

    const allIngredients = [
      mealObject.strIngredient1,
      mealObject.strIngredient2,
      mealObject.strIngredient3,
      mealObject.strIngredient4,
      mealObject.strIngredient5,
      mealObject.strIngredient6,
      mealObject.strIngredient7,
      mealObject.strIngredient8,
      mealObject.strIngredient9,
      mealObject.strIngredient10,
      mealObject.strIngredient11,
      mealObject.strIngredient12,
      mealObject.strIngredient13,
      mealObject.strIngredient14,
      mealObject.strIngredient15,
      mealObject.strIngredient16,
      mealObject.strIngredient17,
      mealObject.strIngredient18,
      mealObject.strIngredient19,
      mealObject.strIngredient20,
    ];
    //removes empty ingredients and capitalizes words in ingredients
    const formattedIngredients = allIngredients
      .filter((e) => e)
      .map((ingredient) => {
        const arr = ingredient.split(" ");
        const newArr = [];
        for (let word of arr) {
          newArr.push(word.charAt(0).toUpperCase() + word.substr(1));
        }
        return newArr.join(" ");
      })
      .filter((e) => e);

    const allMeasures = [
      mealObject.strMeasure1,
      mealObject.strMeasure2,
      mealObject.strMeasure3,
      mealObject.strMeasure4,
      mealObject.strMeasure5,
      mealObject.strMeasure6,
      mealObject.strMeasure7,
      mealObject.strMeasure8,
      mealObject.strMeasure9,
      mealObject.strMeasure10,
      mealObject.strMeasure11,
      mealObject.strMeasure12,
      mealObject.strMeasure13,
      mealObject.strMeasure14,
      mealObject.strMeasure15,
      mealObject.strMeasure16,
      mealObject.strMeasure17,
      mealObject.strMeasure18,
      mealObject.strMeasure19,
      mealObject.strMeasure20,
    ];

    //makes measures list same length as ingredients list and formats to lower case
    const arrayLength = formattedIngredients.length;
    const formattedMeasures = allMeasures
      .map((e) => {
        if (e) {
          const newElement = e.toLowerCase();
          return newElement;
        }
        return;
      })
      .slice(0, arrayLength);

    //formats instructions into an array of paragraphs
    const formattedInstructions = mealObject.strInstructions
      .split("\r\n")
      .filter((e) => e.length > 10);

    return {
      id: mealObject.idMeal,
      name: formattedName,
      ingredients: formattedIngredients,
      measures: formattedMeasures,
      image: mealObject.strMealThumb,
      instructions: formattedInstructions,
    };
  });

  return filteredMeals;
}
