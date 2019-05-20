const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const mongoose = require('mongoose')
const Request = require("../models/Request")

router.get("/detailed-cat/:id", (req,res)=> {
    debugger
    let userId = req.params.id;
    User.findById(userId).populate("catSitter")
        .then( result => {
            debugger
            res.render("detailed-cat", {user : result})
        })
        .catch(err => {
            debugger
            res.send(err)
    });
})

router.get("/make-booking/:userId" , (req, res) => {

    //Update CatOwner Model with id of Sitter.
    debugger
    Request.create({
        catOwner :  mongoose.Types.ObjectId(req.params.userId),
        catSitter:  req.session.user._id
    })
    .then((request)=> {
        res.send("Enjoy your experience")
    })
    .catch((err)=> {
        res.send("err")
    })

    //id of catowner -> req.body / req.params / req.query
    //id of current user -> req.session.user._id

    //User.findOneAndUpdate(catownerID, {catSitter: currentUser.Id})

})
   

module.exports = router;





