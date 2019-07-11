var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000, '127.0.0.1');
console.log('listening to 3000');