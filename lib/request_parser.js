'use strict';

const cowsay = require(`cowsay`);
const queryStringModule = require(`querystring`);
const urlModule = require(`url`);
const winston = require(`winston`);

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'log.json' }),
  ]
});

const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve, reject) => {
    logger.log(`info`, `Original url is: ${JSON.stringify(request.url)}`);
    logger.log(`info`, `Original url is: ${request.url}`);

    request.url = urlModule.parse(request.url, true);
    // request.url.query = queryStringModule.parse(request.url.query); //this does the same thing as adding 'true' after request.url above
    // you can access the url query with request.url.query

    if(request.method === `GET`){
      return resolve(request);
    }
  })
}
