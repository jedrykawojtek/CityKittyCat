var express = require('express');
var router          = express.Router();
// var User          = require("../models/Users");

router.get('/', (req, res) => {
    console.log("Profile session",req.session)
    if(req.session.user) {
        res.render("profile", {user: req.session.user})
    }
    else {
        res.redirect("/login");
    }
 
});

module.exports = router;