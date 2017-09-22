var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String
});

var addUser = function(users, newUser) {
    users.push(newUser);    

    return users;
}

module.exports = addUser;