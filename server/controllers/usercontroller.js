//jshint esversion:8

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');
var jwt =require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// create a new user
router.post('/', function (req, res) {
    
    var userName = req.body.user.username;
    var password = req.body.user.password;

    User.create({
            username: userName,
            passwordhash: bcrypt.hashSync(password, 10)
        })
        .then(

            function createSuccess(user) {
                var token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
                });
            },
            function creareError(err) {
                res.send(500, err.message);
            }
        );
});


router.post('/createuser', function (req, res) {
    // var userName = "fake@fake.com";
    // var password = "ThisIsAPassword";

    var userName = req.body.user.username;
    var password = req.body.user.password;

    User.create({
        username: userName,
        passwordhash: bcrypt.hashSync(password, 10)
    })
    .then(

    function createSuccess(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn:60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        }, function creareError(err) {
            res.send(500, err.message);
        }
    );
});


// SIGNING IN A USER
router.post("/signin", function (req, res) {
    let email = req.body.user.username;
    let password = req.body.user.password;

    User.findOne({
        where:{ username: email }
    }).then(user => {
    //    if (user) {
    //         res.json(user);
    //    } else {
    //        res.send("User not found in our database");
    //    }

        // following is ternary of the above commented out if...
        // res.json does not allow any other following code to execute, replace with function
        user ? comparePasswords(user) : res.send("User not found in our database ");  // user is null here if added in res.send
        // user by itself means if user not null or not defined

        function comparePasswords(user) {
            bcrypt.compare(password, user.passwordhash, function (err, matches) {
                matches ? generateToken(user) : res.send("Incorrect Password");
            });
        }

        function generateToken(user) {

            var token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });

        }

    });

});

//  postman use url http://localhost:3000/api/user/signin
module.exports = router;
