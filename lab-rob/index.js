'use strict';

require('dotenv').config();
const server = require('./lib/server');
const PORT = process.env.PORT;

server.start(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});