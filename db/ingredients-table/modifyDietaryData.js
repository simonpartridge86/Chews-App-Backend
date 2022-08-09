import { query } from "../index.js";
import { meatsSql, fishSql, shellfishSql, dairySql, otherAnimalSql, glutenSql } from '../../libs/ingredient-sql-strings.js';


function processDietarySearchData(searchArray) {
    return searchArray.rows.map((nameElement) => nameElement.name)
}

export async function modifyIngredientDietaryData(){
    const allNames = await query('SELECT name FROM ingredients');
    const dairyFreeSearch = await query('SELECT name FROM ingredients WHERE ' + dairySql + ';');
    const dairyFreeArray = processDietarySearchData(dairyFreeSearch);

    console.log('Dairy array complete');
    const glutenFreeSearch = await query('SELECT name FROM ingredients WHERE ' + glutenSql + ';');
    const glutenFreeArray = processDietarySearchData(glutenFreeSearch);

    console.log('Gluten array complete');
    const vegetarianSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql +  ' AND ' + fishSql + ' AND ' + shellfishSql + ';');
    const vegetarianArray = processDietarySearchData(vegetarianSearch);

    const veganSearch = await query('SELECT name FROM ingredients WHERE ' + meatsSql + ' AND ' + fishSql + ' AND ' + otherAnimalSql + ' AND ' + shellfishSql + ' AND ' + dairySql + `;`);
    const veganArray = processDietarySearchData(veganSearch);
    console.log('Veggie-vegan arrays complete');

    // Map these objects onto an array by rows[i]
    
    for (let ingredient in await allNames.rows) {
        let ingredientName = await allNames.rows[ingredient].name;
        //console.log(ingredientName);
        //console.log("Vegan search 0", veganSearch.rows[0]);
        const res = await query( 
            `UPDATE ingredients SET vegan=$2, gluten_free=$3, vegetarian=$4, dairy_free=$5
            WHERE name=$1 RETURNING *;`, [
                ingredientName,
                veganArray.includes(ingredientName), 
                glutenFreeArray.includes(ingredientName), 
                vegetarianArray.includes(ingredientName), 
                dairyFreeArray.includes(ingredientName)
            ]
        );
    console.log(res.rows[ingredient]);
    }
}

modifyIngredientDietaryData();