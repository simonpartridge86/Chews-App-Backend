import { getIngredients } from "./getIngredients.js";
import { test, expect } from "@jest/globals";
import { getRandomMeal } from "./getRandomMeal";

describe("Ingredient search tests", () => {
  test("expects ingredient search for cucumber to return an array containing cucumber", async () => {
    //ARRANGE
    const actual = await getIngredients("cucumber");
    //ACT
    const expected = ["Cucumber"];
    //ASSERT
    expect(actual).toEqual(expected);
  });

  test("expects ingredient search for bean to return an array containing bean", async () => {
    //ARRANGE
    const actual = await getIngredients("bean");
    //ACT
    const expected = ["Bean Sprouts"];
    //ASSERT
    expect(actual).toEqual(expected);
  });

  test("expects ingredient search for plastics to return an empty array", async () => {
    //ARRANGE
    const actual = await getIngredients("plastics");
    //ACT
    const expected = [];
    //ASSERT
    expect(actual).toEqual(expected);
  });
});

describe("Random meal tests", () => {
  test("expects random main meal to return successfully", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(Array);
    //ASSERT
    expect(actual).toEqual(expected);
  });

  test("expects random meals return to have an id of string type", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(String);
    //ASSERT
    expect(actual[0].id).toEqual(expected);
  });

  test("expects random meal of no valid category to return undefined", async () => {
    //ARRANGE
    const actual = await getRandomMeal("laptop");
    //ACT
    const expected = undefined;
    //ASSERT
    expect(actual).toEqual(expected);
  });

  test("expects random meals return to have a name of string type", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(String);
    //ASSERT
    expect(actual[0].name).toEqual(expected);
  });

  test("expects random meals return to have an image of type string", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(String);
    //ASSERT
    expect(actual[0].image).toEqual(expected);
  });

  test("expects random meals return to have ingredients of type array", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(Array);
    //ASSERT
    expect(actual[0].ingredients).toEqual(expected);
  });

  test("expects random meals return to have measures of type array", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(Array);
    //ASSERT
    expect(actual[0].measures).toEqual(expected);
  });

  test("expects random meals return to have instructions of type array", async () => {
    //ARRANGE
    const actual = await getRandomMeal("main");
    //ACT
    const expected = expect.any(Array);
    //ASSERT
    expect(actual[0].instructions).toEqual(expected);
});
});
