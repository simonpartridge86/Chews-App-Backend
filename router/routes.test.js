/*import express from 'express';
import { request } from 'supertest';
import { test, expect } from "@jest/globals";
*/
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
})

    
  
