'use strict';

const urlModule = require('url');
const queryStringModule = require('querystring');

const logger = require('./winston-logger');

const requestParser = module.exports = {};

requestParser.parse = request => {
  return new Promise((resolve, reject) =>  {
    logger.log('debug', `Original URL: ${JSON.stringify(request.url)}`);
    request.url = urlModule.parse(request.url);
    request.url.query = queryStringModule.parse(request.url.query);
    logger.log('debug', `Parsed URL: ${JSON.stringify(request.url)}`);

    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }

    let sentText = '';
    request.on('data', buffer => {
      sentText += buffer.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(sentText);
        return resolve(request);
      } catch(error) {
        return reject(error);
      }
    });
  });
};
