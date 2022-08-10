import fetch from 'node-fetch';
import { formatResults } from './formatResults.js';

//FILTER MEAL BY AREA AND BY CATEGORY
export async function filterMealByAreaAndCategory(area, category) {
    console.log("arguments:", area, category);
    //FIRST FETCH
    const data = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/filter.php?a=${area}`
    );
    const result = await data.json();
    //SECOND FETCH
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
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
    //return finality
  }

export async function filterMealByArea(area) {

    const data = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/filter.php?a=${area}`
    );
    const result = await data.json();
    let promises = [];
    for (let i in await result.meals) {
      let id = result.meals[i].idMeal;
      const newUrl = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
      );
      const newResult = await newUrl.json();
        promises.push(newResult.meals[0]);
    }
    const finality = await Promise.all(promises);
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
    }
  
  export async function filterMealByCategory(category) {
  
    const data = await fetch(
      `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${category}`
    );
    const result = await data.json();
    let promises = [];
    for (let i in await result.meals) {
      let id = result.meals[i].idMeal;
      const newUrl = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`
      );
      const newResult = await newUrl.json();
        promises.push(newResult.meals[0]);
    }
    const finality = await Promise.all(promises);
    let randomResult = Math.floor(Math.random() * finality.length);
    return formatResults([finality[randomResult]]);
  }
  
  