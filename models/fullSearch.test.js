import express from 'express';
import fetch from 'node-fetch';
import { test, expect, describe } from "@jest/globals";
import { getRecipesFromSummaries, dietarySelection } from './fullSearch';
/*
import request from 'supertest';
import assert from 'assert';

const app = express();
*/

test('the summary results function works', async () => {
    //ARRANGE
    const testSummaryArray = [];
    const data2 = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=vegetarian`
      );
    const result2 = await data2.json();
    testSummaryArray.push(result2.meals);
    const actual = await getRecipesFromSummaries(testSummaryArray.flat());
    //ACT
    //const expected = idMeal;
    //ASSERT
    expect(actual[0]).toMatchObject({idMeal: expect.any(String)});
});







