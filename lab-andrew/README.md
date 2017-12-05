# Lab 07 http-server

## Getting Started

To get started using this application, familiarity with node and npm, as well as git is assumed. Fork/clone this repo to your machine, and do an npm install. You will need to set up a .env file with the PORT you would like to use (i.e. PORT=3000). Run 'node index.js' from the command line to start the server.

## Modules

There is an index.js file which simply requires in the server file and uses .env to set the port, and begins listening on the port. server.js contains most of the functionality of this app. All that is exported from the server.js file is server.start and server.stop. Server.start takes two parameters: the port and a callback, and server.stop only takes a callback. The server.js file however, is also using net to listen to events from the network, and several things happen upon certain events. On connection, a constructor class of Client is instantiated, which takes the socket as an argument. Upon instantiation, it creates using faker a randomly generated unique id, as well as a random name and assigns that to the Client object, and the entire Client object is pushed into an array. As each message event takes place, either a message is sent and displayed to each of the clients, or if a command is detected, that command is parsed and another method is invoked.

## Functionality


## Technology/Credits

This app is being logged with winston and is using faker to generate random names. Net is providing the event listeners on the server.
