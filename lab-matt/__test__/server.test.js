'use strict';

const superagent = require('superagent');


describe('http.js', () => {
  test('GET request should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.text).toContain(`<!DOCTYPE html>`);
        expect(response.text).toContain(`<title> Lab 07 - Matt LeBlanc </title>`);        
      });
  });

  test('GET /cowsays request should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/cowsays')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`\\  (oO)\\_______`);
      });
  });

  test('GET /cowsay?text=<text> request should respond with a 200 status code and say the given text if there is no error', () => {
    return superagent.get('http://localhost:3000/cowsay?text=hi%20there!')
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.text).toContain(`< hi there! >`);
      });
  });

  test('GET /cowsay with no input should say < Ron is awesome!... err, I need something good to say! > if there is no error', () => {
    return superagent.get('http://localhost:3000/cowsay?text= ')
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.text).toContain(`< Ron is awesome!... err, 'I need something good to say!' >`);
      });
  });

  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = {'poodle': 'lola'};
    return superagent.post('http://localhost:3000/echo')
      .send(bodyToTest)
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.body).toEqual(bodyToTest);
      })
      .catch(error => console.log(error));
  });

  test('POST should respond with a 400 if there is any error', () => {
    return superagent.post('http://localhost:3000/echo')
      .set( {'Content-Type': 'application/json'} )
      .send('{')
      .then(() => console.log('This shouldn\'t show'))
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });
});