import { query } from "../index.js";
import { meatsSql, fishSql, shellfishSql, dairySql, otherAnimalSql, glutenSql } from '../../libs/ingredient-sql-strings.js';

export async function modifyIngredientDietaryData(){
    const allNames = await query('SELECT name FROM ingredients');
    const dairyFreeSearch = await query('SELECT name FROM ingredients WHERE ' + dairySql + ';');
    console.log('Line 7 complete');
    const glutenFreeSearch = await query('SELECT name FROM ingredients WHERE ' + glutenSql + ';');
    console.log('Line 9 complete');
    //let testSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql + ';');
    console.log('Line 11 complete');
    const vegetarianSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql +  ' AND ' + fishSql + ' AND ' + shellfishSql + ';');
    const veganSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql + ' AND ' + fishSql + ' AND ' + otherAnimalSql + ' AND ' + shellfishSql + ' AND ' + dairySql + `;`);
    console.log('Line 15 complete');

    // Map these objects onto an array by rows[i]

    console.log(await veganSearch);
    //' OR ' + otherAnimalSql + 
    
    for (let ingredient in await allNamesResult) {
        const res = await query( 
            `UPDATE ingredients SET vegan=$2, gluten_free=$3, vegetarian=$4, dairy_free=$5
            WHERE name=$1 RETURNING *;`, [
                allNamesResult[ingredient],
                await veganResult.includes(await allNamesResult[ingredient]), 
                await glutenFreeResult.includes(await allNamesResult[ingredient]), 
                await vegetarianResult.includes(await allNamesResult[ingredient]), 
                await dairyFreeResult.includes(await allNamesResult[ingredient])
            ]
        );
    console.log(res.rows[0].name, "has dietary properties vegan: ", res.rows[0].vegan,
     ", gluten free: ", res.rows[0].gluten_free,
      ", vegetarian: ", res.rows[0].vegetarian,
       ", and dairy free: ", res.rows[0].dairy_free);
    }
}

modifyIngredientDietaryData();