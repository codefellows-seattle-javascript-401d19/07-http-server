# 07: HTTP Server
Description: **Lab 07 of Code Fellows JavaScript 401d19** </br>
Author: **Matthew LeBlanc** </br>
Date: **12/05/17**

## Features
This lab is a basic HTTP server that has GET and POST routes with test functions and placeholders for the GET /cowsay?text

#### Usage
1. `cd` into the lab-matt repository
2. Make sure to install all the required packages - `npm install`
  - `dotenv`
  - `faker`
  - `cowsay`
  - `http`
  - `winston`
  - `superagent` </br>
<u>**Dev List**</u>
  - `eslint`
  - `jest`
3. create a `.env` with 'PORT=<port#>' file OR `export PORT=<port#>`
4. in the terminal, run `node index.js` to start the server
5. then connect via browser http://localhost:3000 with any of the following extensions
  - `'/'`
  - `'/cowsays'`
  - `'/cowsay?text=<your text>'`

6. POST route in terminal (requires [httpie](https://httpie.org/))
`echo '{"text": "<your text>"}' | http post localhost:3000/api/cowsay`