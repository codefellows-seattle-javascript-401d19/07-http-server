'use strict';

const faker = require('faker');
const cowsay = require('cowsay');

const getRoutes = module.exports = {};

getRoutes.slash = `<!DOCTYPE html>
<head><title>Hello World!</title></head>
<body>
  <h1>Hello World</h1>
  <h2>${faker.hacker.phrase()}</h2>
</body>
</html>`;

getRoutes.cowsays = `${cowsay.say({
  text : 'Vinicio Is Awesome!',
  e : 'oO',     
  T : 'U ',
})}`;

getRoutes.cowsay = (speak) => {
  return `${cowsay.say({
    text : speak,
    e : 'oO',     
    T : 'U ',
  })}`;
};