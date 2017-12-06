# Code Fellows 401 Lab 7
The purpose of this lab is to build a basic HTTP server with Vanilla javascript that takes GET and POST requests and returns a JSON file that modifies test using the cowsay npm dependency.

## Code Style
Standard Javascript with ES6.

## Features
This lab has two parts.  Both interact with the cowsay npm library.
The first takes GET requests from a browser and returns the image of a cow with text above it.  At route "/cowsay", a cow will be displayed with a default message.  At route "/cowsay?text=<your message>", a cow will be displayed with <your message> above it.
The second is a simple API which takes POST requests.  When given a JSON file with the format '{"text": "<your message>"}', an image of a cow with <your message> is returned.

## Running the Server
To run the server, download the repo.  Install dependencies via ```npm install```.  Then, ```npm start```.

## GET requests in browser
You must set your PORT.  In the root of your project directory, create a file with the name '.env'.  Write the following line in that file:  PORT=3000
Open a browser and go to localhost:3000/
Click the link to go to localhost:3000/cowsay
To get a custom message, go to localhost:3000/cowsay?text=<custom message>

## POST request in terminal
Enter the following command where <your message> is your own custom message:
echo '{"text": "<your message>"}' | http post localhost:3000/api/cowsay
