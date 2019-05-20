var express = require('express');
var router = express.Router();

var Picture = require("../models/picture")

/* GET list pictures page. */
router.get('/', function(req, res, next) {

Picture.find({})
    .then((result)=> {

        res.render("gallery", {pictures: result})
    })
    .catch((error)=> {
        res.send(error)
    })

});

module.exports = router;