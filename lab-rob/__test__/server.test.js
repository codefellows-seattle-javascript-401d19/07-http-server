'use strict';

const superagent = require('superagent');

describe('server.js tests', () => {
  test('POST should respond with a 200 status code and an object with a content property.', () => {
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
});

