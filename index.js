'use strict';

const server = require(`./lib/server`);

require(`dotenv`).config(); //this sets up the process.env object with all the variables in .env file

server.start(process.env.PORT, () => {
  console.log(`The server is running on port: ${process.env.PORT}`);
  logger.log(`info`, `The server is running on port: ${process.env.PORT}`);
});
