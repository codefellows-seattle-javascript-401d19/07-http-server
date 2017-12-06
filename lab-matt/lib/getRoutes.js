'use strict';

const cowsay = require('cowsay');

const getRoutes = module.exports = {};

// ____ '/' ____
getRoutes.slash = (phrase) => {
  return `<!DOCTYPE html>
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
      <h1>Lab 07: Code Fellows</h1>
      <h2>http server</h2>
      <h3>Matthew LeBlanc</h3>
      <p>This lab is a basic HTTP server that has GET and POST routes with test functions and placeholders for the GET /cowsay?text</p>
    </main>
    <footer>
      </br>
      </br>
      <h3>Gotta have that faker!</h3>
      <h3>${phrase}</h3>
    </footer>
    </body>
  </html>`;
};

// ____ '/cowsays' ____
getRoutes.cowsays = `<!DOCTYPE html>
<html>
  <head>
    <title> cowsays </title>  
  </head>
  <body>
    <h1> cowsays </h1>
    <pre>
${cowsay.say({
    text : 'Vinicio Is Awesome!',
    e : 'oO',     
    T : 'U ',
  })}
    </pre>
  </body>
</html>`;

// ____ '/cowsay?text=<text>' ____
getRoutes.cowsay = (speak) => {
  let cow;
  if (!speak) {
    cow = cowsay.think({
      text : 'Ron is awesome!... err, I need something good to say!',
      e : 'oO',     
      T : 'U ',
    });
  } else {
    cow = cowsay.say({
      text : speak,
      e : 'oO',     
      T : 'U ',
    });
  }

  return `<!DOCTYPE html>
  <html>
    <head>
      <title> cowsay </title>  
    </head>
    <body>
      <h1> cowsay </h1>
      <pre>
${cow}
      </pre>
    </body>
  </html>`;

};
