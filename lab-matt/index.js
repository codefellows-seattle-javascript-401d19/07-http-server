'use strict';

require('dotenv').config();
const server = require('./lib/server');

// ------- .env VARIABLES used -------
const PORT = process.env.PORT;

// ------- SERVER INITIATE --------
server.start(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});