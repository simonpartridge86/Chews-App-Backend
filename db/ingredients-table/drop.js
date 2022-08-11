import {query} from "../index.js";

export async function dropIngredientsTable() {
    await query("DROP TABLE IF EXISTS ingredients;");
    console.log('Table deleted');
}

dropIngredientsTable();