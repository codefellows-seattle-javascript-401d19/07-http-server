'use strict';

const cowsay = require(`cowsay`);
const http = require(`http`);
const requestParser = require(`./request_parser`);
const winston = require(`winston`);

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'log.json' }),
  ],
});

const server = module.exports = {};

// -----------------------------------------------------------------------

const app = http.createServer((request, response) => {
  logger.log(`info`, `Processing the request : ${request}`);
  logger.log(`info`, `The method received was : ${request.method}`);
  logger.log(`info`, `The header received was : ${JSON.stringify(request.headers)}`);
  logger.log(`info`, `The url received was : ${request.url}`);


  // When a client makes a GET request to / the server should send back html with a project description and an anchor to /cowsay.
  requestParser.parse(request)
    .then(request => {
      logger.log(`info`, `the request.url.query received was: ${JSON.stringify(request.url.query)}`);
      logger.log(`info`, `the request.url received was: ${JSON.stringify(request.url)}`);
      console.log('test log');
      console.log(request.body, 'request.body');
      if(request.method === 'GET' && request.url.pathname === `/`){
        response.writeHead(200, {
          'Content-Type' : 'text/html',
        });
        response.write(
          `<!DOCTYPE html>
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
              <header>
              <main>
                <p>This project tells you what a cool cow would say.</p>
              </main>
            </body>
          </html>`
        );
        logger.log(`info`, `${request}`);
        response.end();
        return;
      }
      else if(request.method === `GET` && request.url.pathname === `/cowsay` && JSON.stringify(request.url.query) !== `{}`){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(
          `<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>
                ${cowsay.say(request.url.query)}
              </pre>
            </body>
          </html>`);
        response.end();
      }
      else if(request.method === `GET` && request.url.pathname === `/cowsay`){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(
          `<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>
                ${cowsay.say({text: 'I need something good to say!'})}
              </pre>
            </body>
          </html>`);
        response.end();
      }
      else if(request.method === `POST` && request.url.pathname === `/api/cowsay`){
        logger.log(`info`, `${JSON.stringify(request.url.query)} is the stringified url.query`);
        response.writeHead(200, {'Content-Type' : 'application/json'});
        logger.log(`info`, `${JSON.stringify(request.url.query)} is the stringified url.query at 97`);
        response.write(`{"content" : ${request.body}}`);
        logger.log(`info`, `${JSON.stringify(request.url.query)} is the stringified url.query at 99`);
        response.end();
        logger.log(`info`, `${JSON.stringify(request.url.query)} is the stringified url.query at 101`);

      }
      else if(request.method === `POST` && request.url.pathname === `/api/cowsay` && there is no body){
        response.writeHead(400, {'Content-Type' : 'application/json'});
        response.write(`{"error" : "invalid request: body required"}`);
        response.end();
      }
      else if(request.method === `POST` && request.url.pathname === `/api/cowsay` && there is no text in the body){
        response.writeHead(400, {'Content-Type' : 'application/json'});
        response.write(`{"error" : "invalid request: text required"}`);
        response.end();
      }
    })
    .catch(error => {
      logger.log(`info`, `There was an error: ${error}`);
      logger.log(`info`, `Responding with 400 error`);

      response.writeHead(404, {});
      response.write(`Error 400: Bad Request`);
      response.end();
      return;
    });
});

// -----------------------------------------------------------------------
//server.start & server.stop are just functions
server.start = (port, callback) => {
  return app.listen(port, callback);
};

server.stop = (callback) => {
  return app.close(callback);
};
