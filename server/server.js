var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body); 
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, ()=> {
    console.log('Started on port 3000');
})

// var newTodo = new Todo({
//     text:'Cook dinner'
// });

// newTodo.save().then((doc)=> {
//     console.log('Save todo', doc)
// }, (err)=> {
//     console.log('Unbale to save todo')
// });


// var otherTodo = new Todo ({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 123
// });

// var otherTodo = new Todo({
//     text: '  Edit this video'
// });

// otherTodo.save().then((doc)=> {
//     console.log('Save otherTodo', doc)
// , (e)=> {
//     console.log('Unable to save otherTodo', err);
// }})

var newUser = new User({
    email: "   abcde   "
});
newUser.save().then((doc)=> {
    console.log('Save newUser', doc)
}, (e) => {
    console.log('Unable to save newUser', err);
});