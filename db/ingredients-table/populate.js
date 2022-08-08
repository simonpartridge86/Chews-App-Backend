import { query } from "../index.js";
import fetch from "node-fetch";

const ingredientsData = await fetch('https://www.themealdb.com/api/json/v2/9973533/list.php?i=list');
const result = await ingredientsData.json();

export async function populateIngredientsTable(){
    for (let i in await result.meals) {
        const res = await query( 
            `INSERT INTO ingredients(name) VALUES ($1)RETURNING*;`,
            [result.meals[i].strIngredient]
        );
    console.log(res.rows[0].name, "inserted");
    }
    }
populateIngredientsTable();