'use strict';

const cowsay = require('cowsay');
const superagent = require('superagent');
const server = require('../lib/server');
const requestParser = require('../lib/request-parser');

describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let testBody = cowsay.say({'text' : 'mooooooooo!'});
    return superagent.post('http://localhost:3000/echo')
      .send(testBody)
      .then(response => {

        expect(response.status).toEqual(200);
        // vinicio - in your homework, you'll change the next line
        expect(response.body).toEqual(requestParser.request.url.query);
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