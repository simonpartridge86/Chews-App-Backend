import { getIngredients } from './getIngredients.js';
import { test,expect } from '@jest/globals';
import { getRandomMeal } from './getRandomMeal';

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

describe ('Random meal tests', () => {
    test('expects random meals to be random meals', async () => {
        //ARRANGE
        const actual = await getRandomMeal('main');
        //ACT
        const expected = expect.any(Array);
        //ASSERT
        expect(actual).toEqual(expected);
        });

    test('expects random meals to be random meals', async () => {
        //ARRANGE
        const actual = await getRandomMeal('main');
        //ACT
        const expected = expect.any(String);
        //ASSERT
        expect(actual[0].id).toEqual(expected);
        });

    test('expects random meals to be random meals', async () => {
        //ARRANGE
        const actual = await getRandomMeal('laptop');
        //ACT
        const expected = undefined;
        //ASSERT
        expect(actual).toEqual(expected);
    });
    
    });