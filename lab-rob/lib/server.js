'use strict';

const http = require('http');
const winston = require('winston');
const faker = require('faker');
const requestParser = require('./requestParser');

const winstonLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'log.json',
      levels: winstonLevels,
    }),
  ],
});

// -----------------------------------------------------

const app = http.createServer((req, res) => {
  logger.log('info', 'Processing request...');
  logger.log('info', `Method: ${req.method}`);
  logger.log('info', `URL: ${req.url}`);
  logger.log('info', `HEADERS: ${JSON.stringify(req.headers)}`);

  requestParser.parse(req)
    .then(req => {
      if(req.method === 'GET' && req.url.pathname === '/') { //someone has requested the main page
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write(`<!DOCTYPE html>
        <html>
          <head>
            <title>This is a title!</title>
          </head>
          <body>
            <h1>Hello World from Server!</h1>
            <h2>${faker.hacker.phrase()}</h2>
          </body>
        </html>`);
        logger.log('info', 'Responding with a 200 status code.');
        res.end();
        return;
      } else if(req.method === 'POST' && req.url.pathname === '/echo') {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(req.body));
        logger.log('info', 'Responding with a 200 status code.');
        res.end();
        return;
      }
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('404 Not Found!');
      logger.log('info', 'Bad route, responding with a 404');
      res.end();
      return;
    }).catch(err => {
      logger.log('info', err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Bad request.');
      res.end();
      return;
    });
});

// -----------------------------------------------------

const server = module.exports = {};

server.start = (port, callback) => {
  logger.log('info', 'Server is up on port ${port}');
  return app.listen(port, callback);
};

server.stop = callback => {
  logger.log('info', 'Server stopping with no errors.');
  return app.close(callback);
};