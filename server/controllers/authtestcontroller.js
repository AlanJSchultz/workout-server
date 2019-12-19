//jshint esversion:8

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');

var AuthTestModel = sequelize.import("../models/authtest.js");

// localhost:3000/authtest/getall
router.get("/getall", function (req, res) {
    var userid = req.user.id;
    AuthTestModel.findAll({
        where: { owner: userid }
    }).then (
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message);
        }
    );
});

// posting data for a given user
// localhost:3000/api/authtest/create
// WHAT GOES IN THE BODY:
// {authtestdata: {item: "Something in here"} }

// let body = {authtestdata: {item: ""}}
router.post('/create', function (req,res) {
    var owner = req.user.id;
    var authTestData = req.body.authTestData.item;

    AuthTestModel.create({
        authtestdata: authTestData,
        owner: owner
    }).then(
        function createSuccess(authtestdata) {
            res.json({
                authtestdata: authtestdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

// sometimes you want to get a single itme that belongs to that user...

// find a single itme

// localhost:3000/authtest/[Primary Key Number]
// anything after the : is a variable
// localhost:3000/authtest/10
// parameters follow the final /
router.get("/:id", function (req,res) {
    var primaryKey = req.params.id;
    var userid = req.user.id;
    AuthTestModel.findOne({
        where: {
            id: primaryKey,
            owner: userid
        }
    }).then(
        data => {
            return res.json(data);
        }),
        err => res.send(500, err.message);  // sequelize why not using .catch for error message
});

// [/delete/[number]]
// localhost:3000/authtest/delete/11
router.delete("/delete/:id", function (req, res) {
    var primaryKey = req.params.id;
    var userid = req.user.id;

    AuthTestModel.destroy({
        where:{
            id: primaryKey,
            owner: userid
        }
    }).then(data => {
        // return res.json(data);
        return data > 0
            ? res.send("Item was deleted")
            : res.send("Nothing deleted");
    }),
        err => res.send(500, err.message);
});

// updating record for the individual
// endpoint: /update/[number her]
// actual URL: localhost:3000/authtest/update/10
router.put("/update/:id", function (req, res) {
    var userid = req.user.id;
    var primaryKey = req.params.id;
    var authtestdata = req.body.authTestData.item;  // camel case in postman

    AuthTestModel.update({
        authtestdata: authtestdata
    },
    {where:{id: primaryKey, owner: userid}}
    ).then(
        data => {
            return res.json(data);
        }),
      err => res.send(500, err.message);
});

module.exports = router;
