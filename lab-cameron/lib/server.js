'use strict';

const http = require('http');
const cowsay = require('cowsay');

const logger = require('./winston-logger');
const requestParser = require('./request-parser');

const app = http.createServer((request, response) => {
  logger.log('info', 'Processing Request');
  logger.log('info', `Method: ${request.method}`);
  logger.log('info', `URL: ${request.url}`);
  logger.log('info', `HEADERS: ${JSON.stringify(request.headers)}`);

  requestParser.parse(request)
    .then(request => {
      if (request.method === 'GET' && request.url.pathname === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>cowsay</title>
            </head>
            <body>
              <header>
                <nav>
                  <ul>
                    <li><a href="/cowsay?text=I need something good to say!">cowsay</a></li>
                  </ul>
                </nav>
              </header>
              <main>
                <!-- project description -->
                This project allows you to make a cow say whatever it is you want.
                Click the link above and then enter into the text input field whatever you
                want.

                Why? because cows taste good. And they're funny
              </main>
            </body>
          </html>`);
        logger.log('info', 'Responding with a 200 status code');
        response.end();
        return;
      } else if (request.method === 'GET' && request.url.pathname === '/cowsay') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>cowsay</title>
            </head>
            <body>
              <h1>cowsay</h1>
              <pre>
                ${cowsay.say({ text: request.url.query.text })}
              </pre>
              <form>
                The Cow Says: <input type="text" name="text"><br>
                <input type="submit" value="Submit">
              </form>
            </body>
          </html>`);
        response.end();
        return;
      } else if (request.method === 'POST' && request.url.pathname === '/api/cowsay') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.body = request.body;
        if (request.url.query.text) {
          const validRequest = {
            'content': `${request.url.query.text}`,
          };
          response.write(JSON.stringify(validRequest));
          response.end();
          return;
        } else {
          console.log('rejected');
          return Promise.reject(response);
        }
      }

      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('Not Found');
      logger.log('info', 'Responding with a 404 status code');
      response.end();
      return;
    }).catch(error => {
      logger.log('info', 'Answering with a 400 status code');
      logger.log('info', error);

      response.writeHead(400, { 'Content-Type': 'text/plain' });

      console.log(request.method);

      if (request.method === 'POST') {
        const badRequest = { 'error': '<cowsay text required>'};
        response.write(JSON.stringify(badRequest));
        response.end();
        return;
      }

      response.write('Bad Request');
      response.end();
      return;
    });
});

const server = module.exports = {};

server.start = (port, callback) => {
  logger.log('info', `Server is up on port ${port}`);
  return app.listen(port, callback);
};

server.stop = callback => {
  logger.log('info', 'Server stopped with no errors');
  return app.close(callback);
};
