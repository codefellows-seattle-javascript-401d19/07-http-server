# Code Fellows: Seattle 401 JavaScript - 401d19


##  Lab 07: Vanilla HTTP Server

### Author:
 Catherine Looper

### Motivation

In this project, I built a (Hypertext Transfer Protocol) HTTP server. This server handles GET and POST requests/responses.

### Build

#### Request Parser

The request parser module returns a promise that parses the request url, querystring, and POST body (as JSON).

#### Server Module

The server module is creating an http server, defining route behavior and exporting an interface for starting and stopping the server. The server module exports an object containing start and stop methods - this is to keep the rest of the server.js code private. 


### Limitations

The POST request is only visible in the command line - it does not post to the browser. 

To use this app - it is assumed that the user has familiarity with the tech and frameworks listed below. 

### Code Style

Standard JavaScript with ES6

### Tech/Framework used

* JavaScript / ES6
* Node.js
* Jest
* Eslint
* Winston
* Superagent
* Cowsay

### How to use?


* Step 1. Fork and Clone the Repository.
* Step 2. npm install.
* Step 3. Follow the specific instructions below for a GET or POST request.

#### GET request:

 A client can make a GET request to ```'/'``` or ```http://localhost:3000``` then the server sends back HTML with a project description and a link to ```/cowsay```. The user can then click the cowsay link and will be redirected to a page that contains an image of a cow and the default text "I need something good to say". To change this message, a user can add ```?text={message}``` where ```{message}``` is whatever the user types.

#### For example:
```http://localhost:3000/cowsay?text=hello```

### Credits

* Code Fellows / Vinicio Vladimir Sanchez Trejo for providing the starter code.
* Andrew Bloom and I worked through the lab together.

### License

MIT © Catherine Looper