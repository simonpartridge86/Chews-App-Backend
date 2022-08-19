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
})

    
  
