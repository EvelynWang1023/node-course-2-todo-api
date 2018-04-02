require('./config/config');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate'); // Leaving off the js extension
const bcrypt = require('bcryptjs');

// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    // console.log(req.body); 
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos,
            code:'asdf'
        });
    }, (e)=> {
            res.status(400).send(e);
    });
});


app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return  res.status(404).send();
        } 
        res.send({todo});
    }). catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, async(req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try{
        const todo = await  Todo.findOneAndRemove({
            _id: id,
            _creator: req.user.id
        });
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    } catch (e) {
        return res.status(400).send();
    }
   


    // Todo.findOneAndRemove({
    //     _id: id,
    //     _creator: req.user.id
    // }).then((todo) => {
    //     if(!todo) {
    //         return res.status(404).send();
    //     }
    //     res.send({todo});
    // }).catch((e)=> {
    //     return res.status(400).send();
    // })
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', async (req, res) => {
    try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        await  user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     //res.send(user);
    //     return user.generateAuthToken();
    // }).then((token) => {
    //     res.header('x-auth', token).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
});

app.get('/users/me', authenticate, (req, res) => {
    var token = req.header('x-auth');
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {
    try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password); 
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send();
    }

    // User.findByCredentials(body.email, body.password).then((user) => {
    //     return user.generateAuthToken().then((token) => {
    //         res.header('x-auth', token).send(user);
    //     });
    // }).catch((e) =>{
    //     res.status(400).send();
    // });
});

app.delete('/users/me/token', authenticate, async(req, res) => {
    try{
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch(e) {
        res.status(400).send();
    }
   
    // req.user.removeToken(req.token).then(()=> {
    //     res.status(200).send();
    // }, () => {
    //     res.status(400).send();
    // })
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