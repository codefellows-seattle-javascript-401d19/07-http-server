'use strict';

const queryStringModule = require(`querystring`);
const urlModule = require(`url`);
const winston = require(`winston`);

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'log.json' }),
  ],
});

const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve, reject) => {
    logger.log(`info`, `Original url is: ${JSON.stringify(request.url)}`);
    logger.log(`info`, `Original url is: ${request.url}`);

    request.url = urlModule.parse(request.url);
    request.url.query = queryStringModule.parse(request.url.query); //this does the same thing as adding 'true' after request.url above
    if(request.method === `GET`){
      return resolve(request);
    }

    let sentMessageText = '';
    request.on(`data`, (buffer) => {
      logger.log(`info`, `The stringified buffer is: ${JSON.stringify(buffer)}`);
      sentMessageText += buffer.toString();
    });

    request.on(`end`, () => {
      try{
        logger.log('info', `${sentMessageText} at 36`);
        request.body = JSON.parse(sentMessageText);
        logger.log('info', `${JSON.parse(sentMessageText)} at 38`);

        return resolve(request);
      }catch(error){
        return reject(error);
      }
    })
  });
};
