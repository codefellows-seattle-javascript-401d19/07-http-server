'use strict';

const superagent = require('superagent');
const cowsay = require('cowsay');
const server = require('../lib/server');


describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .send({
        text: 'hello',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({content: cowsay.say({text: 'hello'})});
      });
  });
  test('POST should respond with a 400 status code if there is any error', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type' : 'application/json'})
      .send('{')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  test('GET should respond with a 200 status code and cowsay with hi as the text', () => {
    return superagent.get('http://localhost:3000/cowsay?text=hi')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(server.cowSpeak(cowsay.say({text: 'hi'})));
      });
  });
  test('GET should respond with a cowsay with I need something good to say as the text', () => {
    return superagent.get('http://localhost:3000/cowsay?tex=hi')
      .then(response => {
        expect(response.text).toEqual(server.cowSpeak(cowsay.say({text: 'I need something good to say'})));
      });
  });
});
