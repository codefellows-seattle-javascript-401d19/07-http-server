#My Cowsay project

#Author: Anthony Robinson

#Usage:
You must first setup your environment variable by creating one in the lab-anthony folder.
create file .env, then within that file type PORT=3000 and save it.

Run npm i to install dependencies.

You may want to `npm install superagent` in your terminal, or use postman to easily make
POST requests.

First you'll need to start your node server by typing in `node index.js` in your terminal.
Next, in your browser type http://localhost:3000/cowsay?text= .
Anything that you type after ?text= will be output as text in a cowsay.

#Example:
http://localhost:3000/cowsay?text=hi

cowsay

` ____
 < hi >
  ----
         \   ^__^
          \  (oo)\_______
             (__)\       )\/\
                 ||----w |
                 ||     ||           
`

To make a POST request with superagent:

`superagent.post('http://localhost:3000/api/cowsay').send({text: 'desired cowsay text',})`
