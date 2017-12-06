'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = {text : 'moo'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(bodyToTest) 
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(bodyToTest);
      });
  });

  test('POST should respond with at 400 status code if there is no body', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({ 'Content-Type': 'application/json' })
      .send('')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST should respond with at 400 status code if there is no text property in the body', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({ 'Content-Type': 'application/json' })
      .send(`{'moo'}`) 
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});