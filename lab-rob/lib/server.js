'use strict';

const http = require('http');
const winston = require('winston');
const cowsay = require('cowsay');
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
      if(req.method === 'GET' && req.url.pathname === '/') {
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        res.write(`<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>
          </head>
          <body>
            <header>
              <nav>
                <ul>
                  <li><a href="/cowsay">cowsay</a></li>
                </ul>
              </nav>
            </header>
            <main>
              <h1>CodeFellows Code 401d19: Full-Stack JavaScript</h1>
              <h2>Lab 7: HTTP Server</h2>
              <h3>Robert Reed, 12/5/17</h3>
              <p>The purpose of this project is to build an HTTP server from scratch using the http node package. Additionally, we are practicing setting up routes for GET and POST requests, and defining how those requests should be handled.</p>
            </main>
          </body>
        </html>`);
        logger.log('info', 'Responding with a 200 status code.');
        res.end();
        return;
      } else if(req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        let cowSpeak;
        if(req.url.query.text)
          cowSpeak = req.url.query.text;
        else
          cowSpeak = 'I need something good to say!';
        res.write(`<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>
          <head>
          <body>
            <h1> cowsay </h1>
              <pre>
                ${cowsay.say({ text: cowSpeak, cow: DRAGON })}
              </pre>
          </body>
        </html>`);
        logger.log('info', 'Responding with a 200 status code.');
        res.end();
        return;
      } else if(req.method === 'POST' && req.url.pathname === '/api/cowsay') {
        if(req.body.error) {
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });
        } else {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });}
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