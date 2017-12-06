'use strict';

const queryStringModule = require(`querystring`);
const urlModule = require(`url`);

const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve, reject) => {
    if(request.method === `GET`){       //if the request's method is GET run the next .then() in server.js
      return resolve(request);
    }
  })
}
