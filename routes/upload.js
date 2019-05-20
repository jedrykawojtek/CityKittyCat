var express = require('express');
var router = express.Router();
var multer = require("multer")

var Picture = require("../models/picture")

const upload = multer({ dest: './public/images'});
/* GET upload form . */
router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', upload.single('picture'), function(req, res, next) {
    debugger
    var split = req.file.originalname.split(".")
    var extension = split[split.length -1]

    Picture.create({
        name: req.file.filename,
        path: `/images/${req.file.filename}`,
        originalName: req.file.originalname,
        extension: extension
    })
    .then((err)=> {
        res.send('respond with a resource');
    })
    .catch((err)=> {
        console.log("err", err)
    })

});
module.exports = router;