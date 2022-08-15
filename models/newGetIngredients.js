import { pool as ingredientPool } from "../db/index.js";

export async function getIngredients(searchTerm) {
  const result = await ingredientPool.query(
    `SELECT * FROM ingredients_new WHERE
  LOWER(name) LIKE LOWER($1||'%') LIMIT 5;`,
    [searchTerm]
  );
  let ingrList = [];
  result.rows.map(async (ingr) => {
    ingrList.push(ingr.name);
  });

  let finality = await Promise.all(ingrList);

  if (finality.length > 0) {
    return finality;
  } else {
    return [];
  }
}
