'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js', () => {
    test('POST request should respond with a 200 status code and body if there is no error', () => {
        let bodyTest = { monty : 'python'};
        return superagent.post('http://localhost:300/cowsay')
        .send(bodyTest)
        .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(bodyTest);
        });
    });
    test('POST should respond with a 400 status code if there is any error', () => {
        return superagent.post('http://localhost:3000/cowsay')
            .set({'Content-Type' : 'application/json'})
            .send('bad object}')
            .then(response => Promise.reject(response))
            .catch(response => {
                expect(response.status).toEqual(400);
            });
    });
});