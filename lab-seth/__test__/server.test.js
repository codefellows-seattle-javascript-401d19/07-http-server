'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js',() => {

  test('POST should return a 200 status code and a body if there is not an error', () => {
    let testObject = {text : 'Hi I am a Cow.'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(testObject)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(testObject);
      });
  });

  test('POST should respond with at 400 status code and a body if there is an error', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type' : 'application/json'})
      .send('{ broken: failedValue ')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should respond with at 404 status code if there is an incorrect url entered', () => {
    return superagent.get('http://localhost:3000/cows')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('GET should return a 200 status code if there is not an error', () => {
    return superagent.get('http://localhost:3000/cowsay?text=moo')
      .set({ 'Content-Type': 'text/html' })    
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
});