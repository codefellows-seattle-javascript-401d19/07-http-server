'use strict';

const faker = require(`faker`);
const winston = require(`winston`);
const http = require(`http`);
const requestParser = require(`./request_parser`);
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
      if(request.url.pathname === `/`){
        response.writeHead(200, {
          'Content-Type' : 'text/html',
        });
        response.write(
          <!DOCTYPE html>
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
          </html>
        );
        response.end();
        return;
      };
    });
});

// -----------------------------------------------------------------------
//server.start & server.stop are just functions
server.start = (port, callback) => {
  return app.listen(port, callback)
};

server.stop = (callback) => {
  return app.close(callback);
};
