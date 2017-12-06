'use strict';

const superagent = require('superagent');
// server is defined for test suite coverage report
const server = require('../lib/server');


describe('server.js', () => {
  describe('HTTP GET requests', () => {
    describe('Home Page: /', () => {
      test('GET request should respond with a 200 status code and a body if there is no error', () => {
        const url = 'http://localhost:3000/';
        return superagent
          .get(url)
          .set({ 'Content-Type': 'text/html' })
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.res.text).toBeDefined();
          });
      });
    });

    describe('Cowsay: /cowsay', () => {
      test('GET request should respond with a 200 status code, and a body if there is no error', () => {
        const url = 'http://localhost:3000/cowsay';
        return superagent
          .get(url)
          .set({ 'Content-Type': 'text/html' })
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.res.text).toBeDefined();
          });
      });

      test('GET request should respond with a 200 status code and a query string object', () => {
        const url = 'http://localhost:3000/cowsay';
        return superagent
          .get(url)
          .set({ 'Content-Type': 'text/html' })
          .query({ text: 'testing'})
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.req.path).toEqual('/cowsay?text=testing');
          });
      });
    });

    test('GET request should respond with a 404 status code if there is any error', () => {
      const url = 'http://localhost:3000/not/a/valid/path';
      return superagent
        .get(url)
        .set({ 'Content-Type': 'text/html' })
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('HTTP POST requests', () => {
    test('POST request should respond with a 200 status code and a body if there is no error', () => {
      const bodyToTest = { cat: 'Gregor' };
      const url = 'http://localhost:3000/echo';
      return superagent
        .post(url)
        .set({ 'Content-Type': 'application/json' })
        .send(bodyToTest)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(bodyToTest);
        });
    });

    test('POST should respond with a 400 status code if there is any error', () => {
      const invalidBodyToTest = '{';
      const url = 'http://localhost:3000/echo';
      return superagent
        .post(url)
        .set({ 'Content-Type': 'application/json' })
        .send(invalidBodyToTest)
        .then(response => Promise.reject(response))
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });
});
