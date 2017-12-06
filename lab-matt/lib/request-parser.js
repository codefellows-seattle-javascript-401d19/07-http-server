'use strict';

const urlModule = require('url');
const queryString = require ('querystring');

const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve, reject) =>{
    request.url = urlModule.parse(request.url);
    request.url.query = queryString.parse(request.url.query);
    
    if (request.method !== 'POST' && request.method !== 'PUT') {
      return resolve(request);
    }
    
    let sentText = '';
    request.on('data', (buffer) => {
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

