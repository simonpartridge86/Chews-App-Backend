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

