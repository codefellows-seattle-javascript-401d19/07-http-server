'use strict';

const superagent = require(`superagent`);
const server = require(`../lib/server`);

describe(`server.js`, () => {
  test(`GET should respond with a 200 status and return html representing the cowsay API`, () => {
    return superagent.get(`http://localhost:3000/`)
      .then(response => {
        expect(response.status).toEqual(200);
      })
  })
})
