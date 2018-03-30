var express = require('express'); //importa o express
var app = express(); //cria um router
var port = 3000 //define a porta
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
//var morgan = require('morgan'); // log requests to the console (express4)
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//middlewares
app.use(bodyParser.json()); // parse application/json

/*
define que se o cliente der um get no servidor,
respondemos com a string 'Hello from Express!'
*/

var string = 'Hello from Express!';
app.get('/', (request, response) => {
  response.send(string)
})

app.put('/', (request, response) => {
  if(request.body != null){
    string = request.body.string;
  }
  response.send(string)
})

/*
define a porta que o servidor deve escutar
*/
app.listen(port, ()=>{
  console.log(`Server running on port: ${port}`)
})
