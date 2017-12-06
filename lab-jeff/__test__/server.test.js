'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = '{"text" : "I am a cow"}';
    let result = {
    "content": " ____________\n< I am a cow >\n ------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||"
};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(bodyToTest)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(result);
      });
  });
  
  test('POST should respond with at 400 status code if there is no body on the request', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type' : 'application/json'})
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST should respond with at 400 status code if the body has no "text" key', () => {
    let bodyToTest = '{"content": "testing"}';
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type' : 'application/json'})
      .send(bodyToTest)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST should respond with at 400 status code if there is any other error', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type' : 'application/json'})
      .send('{')// vinicio - this is what returns a promise
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});
