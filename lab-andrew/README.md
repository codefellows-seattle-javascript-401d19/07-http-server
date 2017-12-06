# Lab 07 http-server

## Getting Started

To get started using this application, familiarity with node and npm, as well as git is assumed. Fork/clone this repo to your machine, and do an npm install. You will need to set up a .env file with the PORT you would like to use (i.e. PORT=3000). Run 'node index.js' from the command line to start the server.

## Modules

There is an index.js file which simply requires in the server file and uses .env to set the port, and begins listening on the port. server.js contains most of the functionality of this app. All that is exported from the server.js file is server.start and server.stop. Server.start takes two parameters: the port and a callback, and server.stop only takes a callback. The request parser (only function exported from the requestParser module) takes the http request, parses the request and returns the type of query and the route. In the server.js file, if the request made is a GET request, either the server will return a cowsay with a default saying, or if a query string is present, it will return a cowsay saying that. If a POST request is made, the request parser will parse the request and determine if the input is correct or incorrect, displaying the appropriate status message.


## Technology/Credits

This app is being logged with winston and is using cowsay to generate cow speech.
