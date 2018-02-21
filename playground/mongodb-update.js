//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Destructing

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server');
    } 
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a8cf985c5d3e598bce537ae')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result)=> {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a8cbf37c5d3e598bce52dc3')
    }, {
        $inc: {
            age:10
        },
        $set: {
            name: 'Monica'
        }
    },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
    })

    //client.close();
});