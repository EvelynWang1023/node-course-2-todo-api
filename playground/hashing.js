const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, 'secret');
// console.log("token:", token);

// var decoded = jwt.verify(token, 'secret');
// console.log('decoded', decoded);

// var message = "i'm user Number3.";
// var hash = SHA256(message).toString();

// console.log("Message: ",message);
// console.log("Hash: ", hash);

// var data = {
//     id: 3
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

// // token.data.id=5;
// // token.hash =  SHA256(JSON.stringify(data)).toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data is changed, dont trust');
// }