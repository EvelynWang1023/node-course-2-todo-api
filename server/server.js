require('./config/config');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express();
const port = process.env.PORT;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos,
            code:'asdf'
        });
    }, (e)=> {
            res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return  res.status(404).send();
        } 
        res.send({todo});
    }). catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=> {
        return res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed= false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, ()=> {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};

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

// var newUser = new User({
//     email: "   abcde   "
// });
// newUser.save().then((doc)=> {
//     console.log('Save newUser', doc)
// }, (e) => {
//     console.log('Unable to save newUser', err);
// });