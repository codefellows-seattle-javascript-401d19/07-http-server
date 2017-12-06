Lab 07: Vanilla HTTP Server
======

## Motivation
To build an HTTP server which will use GET and POST paths to render data in the browser or respond to API calls.

## Technologies Used
-Node.js (ES6 notation where possible)
-NPM packages (winston, dotenv, and cowsay)

## How to Use

To start this app, clone this repo from 

  `http://www.github.com/kerrynordstrom/07-http-server`

install all necessary packages with 

  `npm install`

  Then start your node server with index as the starting point

  `node index.js`

  And you will then be able to navigate to `http://localhost:3000/` where you will find a hyperlink to access the cowsay page.

  From here, type a query string in the address bar to have the cow repeat your phrase!  Example below:

  `http://localhost:3000/?text=<your text here>`

                   _______
< moooo > 
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
              

## Modules

### Server Module 
The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stopping the server. It exports an object with `start` and `stop` methods. 

### Request Parser Module
The request parser module is responsible for parsing incoming data and concatenating it, once parsed to send as a result to the server. It exports an object with this parsed information.

## Routes

#### GET 
When a client makes a GET request to `/` the server sends back html with a project description and a link to /cowsay.
``` html
<!DOCTYPE html>
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
     <!-- project description -->
   </main>
  </body>
</html>
```

#### GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server parses the querystring and passes this message as an object with a text key and string value to the cowsay .say method. This is represented by a rendered HTML page with a cowsay cow speaking the value of the text query. If there is no text query the cow message says `'Give me something to say!'`. 
``` html
<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
    <h1> cowsay </h1>
    <pre>
      <!-- cowsay.say({text: req.query.text}) -->
    </pre>
  </body>
</html>
```

#### POST /api/cowsay 
When a client makes a POST request to /api/cowsay a JSON object is sent that includes `{"text": "<message>"}`. 

#### Server Responses


* A response for a valid Request has a status code of 200 and the JSON body will say:

``` json 
{
  "content": "<cowsay cow text>" 
}
```

* A response for an invalid Request has a status code of 400 and the JSON body:
```
{
  "error": "invalid request: text query required"
}
```

| Request | Response Status Code | Response Type | Response Body |
| -- | -- | -- | -- |
| With out a body | 400 | JSON | `{"error": "invalid request: body required"}` |
| With out text property on the body | 400 | JSON | `{"error": "invalid request: text required"}` |
| With text body | 200 | JSON | `{"content": "<cowsay cow text>"}` |


## Tests

Write a 200 and 400 test for your POST request to `/api/cowsay`
