'use strict';

const http = require('http');
const winston = require('winston');
const requestParser = require('./request-parser');
const getRoutes = require('./getRoutes');
const faker = require('faker');


const winstonLevels = {error: 0, warn: 1, info: 2, verbose: 3, debug: 4};

const logger = new(winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'log.json',
      levels: winstonLevels,
    }),
  ],
});

// ========= SERVER =========
const app = http.createServer((request, response) => {
  logger.log('info', 'Processing Request');
  logger.log('info', `Method: ${request.method}`);
  logger.log('info', `URL: ${request.url}`);
  logger.log('info', `Headers: %j`, request.headers);

  requestParser.parse(request)
    .then(request => {

      // ========== GET ROUTES =============
      if (request.method === 'GET') {
        switch (request.url.pathname) {

          case '/': 
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(getRoutes.slash(faker.hacker.phrase()));
            logger.log('info', 'Responding with a 200 status code');
            response.end();
            return;

          case '/cowsays':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(getRoutes.cowsays);
            logger.log('info', '/cowsays responding with 200 status code');
            response.end();
            logger.log('info', 'Cow Says: Vinicio Is Awesome!');
            return;

          case '/cowsay':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            if (!request.url.query.text) request.url.query.text = 'Ron is awesome!... err, \'I need something good to say!\'';            
            response.write(getRoutes.cowsay(request.url.query.text));
        
            logger.log('info', `/cowsays ${request.url.query.text}`);
            response.end();
            winston.info(`cow said ${request.url.query.text}`);
            return;
        }

        // =================== POST ROUTES ===================
      } else if (request.method === 'POST') {
        switch (request.url.pathname) {
          
          case '/echo': 
            logger.log('info', `Responding with a 200 status code`);      
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.write(JSON.stringify(request.body));        
            response.end();
            return;

          case '/api/cowsay':
            logger.log('info', `Responding with a 200 status code`);      
            response.writeHead(200, { 'Content-type': 'application/json' });
            response.write(JSON.stringify(request.body));        
            response.end();
            return;
        }

      } else {
        logger.log('info', `Responding with a 400 status code`);      
        response.writeHead(404, { 'Content-type': 'text/plain' });
        response.write('error, no file found');
        response.end();
      }
    }).catch(error => {
      logger.log('info', `Responding with a 400 status code`);
      logger.log('info', error);
      response.writeHead(400, { 'Content-type': 'text/plain' });
      response.write('error, bad request');
      response.end();      
    });
  
});

// ========= SERVER INITIATE =========
const server = module.exports = {};

server.start = (port, callback) => {
  logger.log('info', `server up on port: ${port}`);
  return app.listen(port, callback);
};

server.stop = (callback) => {
  logger.log('info', `server has stopped with no errors`);
  return app.close(callback);
};