var express = require("express")
var router = express.Router();

var express = require("express")
var router = express.Router();

import {getEvent} from "../handlers/eventHandler"

router.get("/", function(req, res){
    res.redirect('/')
})

router.get('/:year', function(req, res){
    res.redirect('/')
})

router.get('/:year/:month', function(req, res){
    res.redirect('/')
})

router.get('/:year/:month/:name', getEvent)

module.exports = router