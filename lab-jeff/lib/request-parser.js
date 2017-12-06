'use strict';

const urlModule = require('url');
const queryStringModule = require('querystring');

const winston = require('winston');
const winstonLevels = {error: 0, warn : 1, info : 2, verbose: 3 , debug: 4};
const logger = new (winston.Logger)({
  transports : [
    new (winston.transports.File)({
      filename : 'log.json',
      levels : winstonLevels,
    }),
  ],
});


const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve,reject) => {
    //-------------------------------------------------------------
    // This will be done for ALL requests
    //-------------------------------------------------------------
    request.url = urlModule.parse(request.url);
    request.url.query = queryStringModule.parse(request.url.query);

    if(request.method !== 'POST' && request.method !== 'PUT')
      return resolve(request);
    //-------------------------------------------------------------
    // Parsing a body is JUST for HTTP methods that include a body
    //-------------------------------------------------------------
    // vinicio - if I'm in this part of the code, I know it's a POST/PUT request
    let sentText = '';
    request.on('data',(buffer) => {
      sentText += buffer.toString();
    });

    request.on('end',() => {
      try{
        // vinicio - this is mutating the request object, and creating an
        //           body property
        console.log('sent text1:' + sentText + '!');
        if(sentText === '\n') sentText = '{"error": "error"}';
        console.log('sent text2:' + sentText + '!');
        request.body = JSON.parse(sentText);
        return resolve(request);
      }catch(error){
        return reject(error);
      }
    });
  });
};
