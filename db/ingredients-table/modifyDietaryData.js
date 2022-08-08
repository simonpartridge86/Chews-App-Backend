import { query } from "../index.js";
import { meatsSql, fishSql, shellfishSql, dairySql, otherAnimalSql, glutenSql } from '../../libs/ingredient-sql-strings.js';

export async function modifyIngredientDietaryData(){
    let allNames = await query('SELECT name FROM ingredients');
    let veganSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql + fishSql +shellfishSql + dairySql + otherAnimalSql + ';');
    let glutenFreeSearch = await query('SELECT name FROM ingredients WHERE ' + glutenSql + ';');
    let dairyFreeSearch = await query('SELECT name FROM ingredients WHERE ' + dairySql + ';');
    let vegetarianSearch = await query('SELECT name FROM ingredients WHERE ' + dairySql + ';');
    
    for (let i=0; i<allNames.length; i++) {
        const res = await query( 
            `UPDATE ingredients SET vegan=$2, gluten_free=$3, vegetarian=$4, dairy_free=$5
            WHERE name=$1 RETURNING *;`, [
                allNames[i],
                veganSearch.includes(allNames[i]), 
                glutenFreeSearch.includes(allNames[i]), 
                vegetarianSearch.includes(allNames[i]), 
                dairyFreeSearch.includes(allNames[i])
            ]
        );
    console.log(res.rows[0].name, "has dietary properties vegan: ", res.rows[0].vegan,
     ", gluten free: ", res.rows[0].gluten_free,
      ", vegetarian: ", res.rows[0].vegetarian,
       ", and dairy free: ", res.rows[0].dairy_free);
    }
}