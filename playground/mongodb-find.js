//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Destructing

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').find({
    //     // _id: new ObjectID("5a8caec10e93970a2851921c")
    // })
    // .count()
    // // .toArray()
    // .then((count) => {
    //     console.log(`Todos count: ${count}`);
    //     //console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Evelyn'}).toArray()
    .then((doc) => {
        console.log(JSON.stringify(doc, undefined, 2));
    }, (err)=> {
        console.log('Unable to get users', err);
    });

    //client.close();
});