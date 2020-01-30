const bcrypt = require('bcrypt');
const saltRounds = 10;

let generateHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}
let compareHash = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                reject(err);
            }
            if (res == false) {
                reject("invalid password")
            }
            resolve(res);
        });
    });
}
let makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { generateHash, compareHash, makeId };