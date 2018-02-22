
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a8d09651291ca08f41ed9e0';

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id:'5a8e624fc5d3e598bce55c6d'}).then((result) => {
    console.log(result);
});

Todo.findByIdAndRemove('5a8e624fc5d3e598bce55c6d').then((result) => {
    console.log(result);
});