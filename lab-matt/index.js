'use strict';

const cowsay = require('cowsay');
const qs = require('querystring');
const url = require('url');


require('dotenv').config();
const server = require('./lib/server');

// ------- .env VARIABLES used -------
const PORT = process.env.PORT;

// ------- SERVER INITIATE --------
server.start(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// console.log(cowsay.say({
// 	text : "I'm a moooodule",
// 	e : "oO",
// 	T : "U "
// }));

// console.log(cowsay.think({
// 	text : "I'm a moooodule",
// 	e : "oO",
// 	T : "U "
// }));


// let urf = url.parse('/cowsay?text=herro');
// console.log(qs.parse('/cowsay?text=herro'));
// console.log(urf);
// console.log(qs.parse(urf.query));

