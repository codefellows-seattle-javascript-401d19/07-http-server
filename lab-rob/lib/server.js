'use strict';

const http = require('http');
const winston = require('winston');
const requestParser = require('./requestParser');

const winstonLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

const logger = new (winson.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'log.json',
      levels: winstonLevels,
    }),
  ],
});


const server = module.exports = {};

server.start = (port, callback) => {
  logger.log('info', 'Server is up on port ${port}');
  console.log('Server is up on port ${port}');
  return app.listen(port, callback);
};

server.stop = callback => {
  logger.log('info', 'Server stopping with no errors.');
  return app.close(callback);
};