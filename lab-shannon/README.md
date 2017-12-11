## Purpose

This program allows users to interact with the cowsay API. Users can access the main page and follow the link to see an ASCII cow saying something cool.

## How To Use
* From your command line run "npm install" to install all of the dependencies.
* Run "node index.js" to start the server. You can see the webpage by going to "http://localhost:3000"
* In a second tab in your terminal install jest for testing run "npm i -s jest". You will then be able to use the command npm test to execute all tests in the test files.

## Commands
* Access the cowsay API page by starting the server (details above) and going to localhost:3000
* You can then click on the cowsay link to see a cow asking for something good to say
* You can change what the cow is saying by adding "?text=whateverYouWantToSay"; spaces can be included between words using the characters "%20"
for example: localhost:3000/cowsay?text=%20you%20want%20to%20say

## Technologies Used
* cowsay
* node
* jest
* eslint
* winston
* superagent
* dotenv
* ES6

## Credits
* Vinicio Vladimir Sanchez Trejo & the Code Fellows curriculum provided the base .eslintrc, .eslintignore, .gitignore, index.js, log.json, and server.js files upon which the command functions were built.
* My fellow 401JS classmates for help problem solving and debugging.
