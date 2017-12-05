'use strict';

const faker = require(`faker`);
const winston = require(`winston`);
const http = require(`http`);
// -----------------------------------------------------------------------

const app = http.createServer((request, response) => {
  logger.log(`info`, `Processing the request : ${request}`);
  logger.log(`info`, `The method received was : ${request.method}`);
  logger.log(`info`, `The header received was : ${JSON.stringify(request.headers)}`);
  logger.log(`info`, `The url received was : ${request.url}`);


  // When a client makes a GET request to / the server should send back html with a project description and an anchor to /cowsay.

  response.writeHead(200, {
    'Content-Type' : 'text/plain' OR 'text/html' OR 'application/json',
    "" : ""
  });
  response.write(content);
  response.end();
});

// -----------------------------------------------------------------------
const server = module.exports = {};
//server.start & server.stop are just functions
server.start = (port, callback) => {
  return app.listen(port, callback)
};

server.stop = (callback) => {
  return app.close(callback);
};
