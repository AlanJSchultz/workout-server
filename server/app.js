//jshint esversion:8

require('dotenv').config();
var express = require('express');
var app = express();
var test = require('./controllers/testcontroller');  // in another folder and file
var authTest = require("./controllers/authtestcontroller");
var sequelize = require('./db');
var bodyParser = require("body-parser");

var user = require('./controllers/usercontroller');
var log = require('./controllers/logcontroller');
var login = require('./controllers/logincontroller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require('./middleware/header')); // has to be after the app.use of bodyparser

// app.get("/", function (req, res) {
//     res.send('Hello');
// });

// app.use('/api/test', function (req, res) {
//     res.send("This is data from the api/test endpoint");
// });

// app.use('/about-me', function (req, res) {
//     res.send("I am old enough and I am from here.");
// });

app.use('/api/user', user);
app.use('/api/login', login);
app.use('/test-controller', test);  // var test has actual location

app.use(require('./middleware/validate-session'));
// anything after MiddleWare Validation Session is protected routes and will need a session token
app.use('/api/log', log);
app.use("/authtest", authTest);

app.listen(3000, function () {
    console.log("app is listening on port 3000");
});

