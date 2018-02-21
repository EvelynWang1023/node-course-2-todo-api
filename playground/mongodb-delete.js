//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Destructing

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');
    
// deleteMany
    db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=> {
        console.log(result);
    });

// deleteOne
    db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=> {
    console.log(result);
    });

// findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
        console.log(result);
    });


    db.collection('Users').deleteMany({name: "wang"}).then((result)=> {
        console.log(result);
    });
    
    db.collection('Users').deleteOne({age: 23}).then((result)=> {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5a8cb2eca00db221e81768c8")}).then((result)=> {
        console.log(result);
    });



    //client.close();
});