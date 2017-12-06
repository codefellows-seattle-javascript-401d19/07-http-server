'use strict';

const superagent = require('superagent');


describe('http.js', () => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = {'poodle': 'lola'};
    return superagent.post('http://localhost:3000/echo')
      .send(bodyToTest)
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.body).toEqual(bodyToTest);
      });
  });

  test('POST should respond with a 400 if there is any error', () => {
    let bodyToTest = {'poodle': 'lola'};
    return superagent.post('http://localhost:3000/echo')
      .set( {'Content-Type': 'application/json'} )
      .send('{')
      .then(response => Promise.reject(response))
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });
});