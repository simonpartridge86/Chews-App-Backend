import { getIngredients } from './getIngredients.js';
import { test,expect } from '@jest/globals';


describe ('Ingredient search tests', () => {
test('expects ingredient search for cucumber to return an array containing cucumber', async () => {
    //ARRANGE
    const actual = await getIngredients('cucumber');
    //ACT
    const expected = ["Cucumber",]; 
    //ASSERT
    expect(actual).toEqual(expected);
});

test('expects ingredient search for beans to return an array containing beans', async () => {
    //ARRANGE
    const actual = await getIngredients('bean');
    //ACT
    const expected = ["Bean Sprouts",]; 
    //ASSERT
    expect(actual).toEqual(expected);
})

test('expects ingredient search for plastics to return an empty array', async () => {
    //ARRANGE
    const actual = await getIngredients('plastics');
    //ACT
    const expected = []; 
    //ASSERT
    expect(actual).toEqual(expected);
})
});

