'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = { 'text' : 'Bob'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(bodyToTest)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({'content': 'Bob'});
      });
  });
  test('POST should respond with at 400 status code if there is any error', () => {
    return superagent.post('http://localhost:3000/echo')
      .set({'Content-Type' : 'application/json'})
      .send('{') 
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});