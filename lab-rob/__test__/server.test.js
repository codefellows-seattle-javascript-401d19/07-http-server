'use strict';

const superagent = require('superagent');

describe('server.js tests', () => {
  test('POST should respond with a 200 status code and an object with a "content" property containing a cow string.', () => {
    let testCowObject = {
      'content': ' __________\n< test cow >\n ----------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||',
    };

    return superagent.post('http://localhost:3000/api/cowsay')
      .send({text: 'test cow'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(testCowObject);
      });
  });

  test('POST should respond with a 400 status code and an object containing an error property if an object is sent without a text property.', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type': 'application/json'})
      .send({notText: 'whoops'})
      .then(res => {
        Promise.reject(res);
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });

  test('POST should respond with a 400 status code and an object containing an error property if no data is sent.', () => {
    return superagent.post('http://localhost:3000/api/cowsay')
      .set({'Content-Type': 'application/json'})
      .then(res => {
        Promise.reject(res);
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });
  
  test('POST should respond with a 404 status code and an object containing an error property if a bad route is sent.', () => {
    return superagent.post('http://localhost:3000/api/cowsayyyyyyyyy')
      .set({'Content-Type': 'application/json'})
      .then(res => {
        Promise.reject(res);
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
  });
});

