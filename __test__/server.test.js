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
  test(`GET should respond with a 200 status when /cowsay is hit with a string provided in the request query`, () => {
    return superagent.get(`http://localhost:3000/cowsay?text=word`)
      .then(response => {
        expect(response.status).toEqual(200);
      })
  })
  test(`GET should respond with a 200 status when /cowsay is hit with a string provided in the request query`, () => {
    return superagent.get(`http://localhost:3000/cowsay`)
      .then(response => {
        expect(response.status).toEqual(400);
      })
  })
})
