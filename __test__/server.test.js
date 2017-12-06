'use strict';

const superagent = require(`superagent`);
const server = require(`../lib/server`);

describe(`server.js`, () => {
  test(`GET should respond with a 200 status and return html representing the cowsay API`, () => {
    return superagent.get(`http://localhost:3000/`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
  test(`GET should respond with a 200 status when /cowsay is hit with a string provided in the request query`, () => {
    return superagent.get(`http://localhost:3000/cowsay?text=word`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
  test(`GET should respond with a 200 status when /cowsay is hit without a string provided in the request query`, () => {
    return superagent.get(`http://localhost:3000/cowsay`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
  test(`POST should return a 200 status when /api/cowsay is hit and no errors are present`, () => {
    let bodyToTest = {text : 'moo goes the cow'};
    return superagent.post(`http://localhost:3000/api/cowsay`)
    .send(bodyToTest);
    .then(response =>
      expect(reponse.status).toEqual(200);
    })
  })
  // test(`POST should respond with a 400 status when /api/cowsay is hit without a body provided`, () => {
  //   return superagent.post(`http://localhost:3000/api/cowsay`)
  //   .set({'Content-Type' : 'application/json'})
  //   .send('}')
  //   .then(response => Promise.reject(response))
  //   .catch((response) => {
  //     expect(reponse.status).toEqual(400);
  //   })
  // })
  // test(`POST should respond with a 400 status when /api/cowsay is hit without text provided`, () => {
  //   return superagent.post(`http://localhost:3000/api/cowsay`)
  //   .set({'Content-Type' : 'application/json'})
  //   .send('}')
  //   .then(response => Promise.reject(response))
  //   .catch((response) => {
  //     expect(reponse.status).toEqual(400);
  //   })
  // })
});
