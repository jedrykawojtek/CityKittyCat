var express = require('express');
var router          = express.Router();
// var User          = require("../models/Users");

router.get('/', (req, res) => {
    console.log("Profile session",req.session)
    debugger
    if(req.session.user) {
        debugger
        res.render("profile", {user: req.session.user})
    }
    else {
        debugger
        res.redirect("/login");
    }
 
});

module.exports = router;