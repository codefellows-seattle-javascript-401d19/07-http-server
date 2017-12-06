# 07: Vanilla HTTP Server

This project allows you to make a cow say whatever it is you want.
Click the link above and then enter into the text input field whatever you
want.

# Screenshots

![Alt text](https://raw.githubusercontent.com/CameronMoorehead/07-http-server/master/lab-cameron/images/Selection_101.png)

# Tech Used

### Built with:
- Node.js http module
- cowsay
- eslint
- jest
- superagent
- dotenv
- winston

# Features

Allows GET and POST requests to be made over http to the server that Node spins
up. GET requests are primarily used to change pages and write to the client.
POST requests are for the /api/cowsay path that allows you to input an empty
JSON object and receive back an object with the current querystring found
in the URL.

# Installation

1. Clone the repo
2. run `npm run start`
3. go to localhost:3000

# Tests

All tests implemented via Jest and superagent

# Credits

Cameron Moorehead

# License

GPL-3.0
