import { pool as ingredientPool } from "../db/index.js";

export async function getIngredientsBySearch(searchTerm) {
  const result = await ingredientPool.query(
    `SELECT * FROM ingredients WHERE
  LOWER(name) LIKE LOWER($1||'%') LIMIT 5;`,
    [searchTerm]
  );
  let ingrList = [];
  result.rows.map(async (ingr) => {
    ingrList.push(ingr.name);
  });
  return Promise.all(ingrList);
}
