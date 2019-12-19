//jshint esversion:8

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');

var LogModel = sequelize.import('../models/log.js');


// create a workout log 
router.post('/', function (req, res) {
    var owner = req.user.id;
    var description = req.body.log.description;
    var definition = req.body.log.definition;
    var result = req.body.log.result;

    LogModel.create({
        description: description,
        definition: definition,
        result: result,
        owner: owner
    }).then(
        function createSuccess(description) {
            res.json({
                description: description,
                definition: definition,
                result: result
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});


// gets all logs for an individual
router.get('/', function (req, res) {
    var userid = req.user.id;
    LogModel.findAll({
        where: { owner: userid }
    }).then (
        function findAllSuccess(data) {
            res.json(data)
        }, function findAll(err) {
            res.send(500, err.message);
        }
    );
});


// gets individual logs by id for an individual user
router.get('/:id', function (req, res) {
    var primaryKey = req.params.id;
    var userid = req.user.id;
    LogModel.findOne({
        where: {
            id: primaryKey,
            owner: userid
        }
    }).then(
        data => {
            return res.json(data);
        }),
        err => res.send(500, err.message);
});


// allows individual logs to be updated by a user
router.put('/:id', function (req, res) {
    var owner = req.user.id;
    var primaryKey = req.params.id;
    var description = req.body.log.description;
    var definition = req.body.log.definition;
    var result = req.body.log.result;

    LogModel.update({
        description: description,
        definition: definition,
        result: result,
        owner: owner
    },
    {where:{id: primaryKey, owner: owner}}
    ).then(
        data => {
            return res.json(data);
        }),
        err => res.send(500, err.message);
});


// allows individual logs to be deleted by a user
router.delete('/:id', function (req, res) {
    var primaryKey = req.params.id;
    var userid = req.user.id;

    LogModel.destroy({
        where:{
            id: primaryKey,
            owner: userid
        }
    }).then(data => {
        return data > 0
            ? res.send("Item was deleted")
            : res.send("Nothing deleted");
    }),
        err => res.send(500, err.message);
});


module.exports = router;
