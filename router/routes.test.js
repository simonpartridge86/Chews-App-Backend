import request from 'supertest';
import { test, expect } from "@jest/globals";
import app from '../app.js';


test('See if the app loads at all', async () => {
    app.get('/user', function(req, res) {
       res.status(200).json({ name: 'john' });
    }); 

    await request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200);
});

test('See if get ingredients route for cucumber returns a Cucumber', async () => {
    app.get('/ingredients-list/cucumber', function(req, res) {
       res.status(200);
    }); 
    
    await request(app)
    .get('/ingredients-list/cucumber')
    .expect({success: true, payload: ["Cucumber",]})
    .expect(200);
});

test('See if get ingredients route for beans returns a beans', async () => {
    app.get('/ingredients-list/bean', function(req, res) {
       res.status(200);
    }); 
    
    await request(app)
    .get('/ingredients-list/bean')
    .expect({success: true, payload: ["Bean Sprouts",]})
    .expect(200);
});

test('See if get ingredients route for plastics returns empty array', async () => {
    app.get('/ingredients-list/plastics', function(req, res) {
       res.status(200);
    }); 
    
    await request(app)
    .get('/ingredients-list/plastics')
    .expect({success: true, payload: []})
    .expect(200);
});
   
//MEAL RESULT TESTING
// test('See if we get a random meal object', async () => {
//     app.get('/random-meal?meal=main', function(req, res) {
//        res.status(200);
//     });
//     await request(app)
//     .get('/random-meal?meal=main')
//     .expect({success: true, payload: [
//         {
//           id: expect.any(String),
//           name: expect.any(String),
//           ingredients: expect.any(Array),
//           measures: expect.any(Array),
//           image: expect.any(String),
//           instructions: expect.any(Array)
//         }
//       ]})
//     .expect(200);
// });
  
