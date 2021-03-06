//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Destructing
// C:\Program Files\MongoDB\Server\3.6\bin   mongod.exe --dbpath /Users/wange/mongo-data

//------Destructing-------
// var user = {name: 'evelyn', age: 25};
// var {name} = user;
// console.log(name);

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connect to MongoDB server');

     const db = client.db('TodoApp');
    db.collection('Todos').insertOne({
        text:'Something to do',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.collection('Users').insertOne({
        name: 'Evelyn',
        age: 24,
        location: 'CA'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert user', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    })

    client.close();
});