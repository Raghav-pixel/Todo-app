var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://new-raghav_04:raghavk@cluster0-w1bea.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

//Create a Schema- this is like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

//Create a model
var Todo = mongoose.model('Todo', todoSchema); 

//var data = [{item: 'Go to Gym'}, {item: 'Do running'}, {item: 'Do some Coding'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app){

	app.get('/todo', function(req,res){
		//get data from mongodb and pass it to view
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req,res){
		// get data from view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req,res){
		//delete the requested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});
}