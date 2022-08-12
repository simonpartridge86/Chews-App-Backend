import { getIngredients } from './getIngredients.js';
import { test,expect } from '@jest/globals';

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
});