import { query } from "../index.js";
import fetch from "node-fetch";

// Populate a table with ingredient names, but dietary preferences set to default values of true

const ingredientsData = await fetch('https://www.themealdb.com/api/json/v2/9973533/list.php?i=list');
const result = await ingredientsData.json();

export async function populateIngredientsTable(){
    for (let i in await result.meals) {
        const res = await query( 
            `INSERT INTO ingredients(name, vegan, gluten_free, vegetarian, dairy_free) VALUES ($1, $2, $3, $4, $5) RETURNING*;`,
            [result.meals[i].strIngredient, true, true, true, true]
        );
    console.log(res.rows[0].name, "inserted");
    }
    }
populateIngredientsTable();