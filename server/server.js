// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var addUser     = require('./models/user');

var mongoose   = require('mongoose');

var users = generateUsers();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    console.log('Request occured. Link:', req.url, " : ", req.method, req.params);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here




router.route('/users')
    
    .get(function (req, res) {
        res.json(users);
    });


router.route('/users/add')
    .post(function(req,res) {
        var user = {};
        user.id = users.length;
        user.name = req.body.name;

        users = addUser(users, user);

        res.status(201);
        res.json(users);
    });







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);





function generateUsers() {

    var users = [];

    for(var i = 0; i < 10; i++) {
        var user = {};
        user.id = i;
        user.name = "User_" + i;

        users.push(user);
    }

    return users;
}