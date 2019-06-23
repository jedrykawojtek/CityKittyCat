const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// require models
const User = require('../models/Users')

// Get cats Route
router.get('/cats', (req, res) => {
    // if(!req.session.user) {
    //     res.redirect("/login")
    //     return;
    // }
    res.render('cats')

})
// Post Register Route
router.post('/cats', (req, res, next) => {
    // if(!req.session.user) {
    //     res.redirect("/login")
    //     return;
    // }
  
    var {imageUrl, streetName , name, age, gender, furColour, favouriteMusic, favouriteFood, favouriteGame, favouriteTvShow, yoga, scratching, purring}=req.body;
    

    if(purring === "on") {
      purring = true
    } else {
      purring = false
    }

    if(scratching === "on") {
      scratching = true
    } else {
      scratching = false
    }

    if(yoga === "on") {
      yoga = true
    } else {
      yoga = false
    }

    const update = {
        imageUrl,
        streetName:streetName,
        "catDetails.name":name,
        "catDetails.age": parseInt(age),
        "catDetails.gender":gender,
        "catDetails.furColour" :furColour,
        "catDetails.favouriteMusic":favouriteMusic,
        "catDetails.favouriteFood":favouriteFood,
        "catDetails.favouriteTvShow":favouriteTvShow,
        "catDetails.favouriteGame":favouriteGame,
        "catDetails.yoga":yoga,
        "catDetails.scratching":scratching,
        "catDetails.purring":purring,
        
      }
    User.findOneAndUpdate({_id: req.session.user._id}, update, (err) => {
        if (err){ return next(err); }
        res.redirect('./profile');
        debugger
      })
      .catch((err)=> {
        res.status(500).send("An error has occured", err)
      })
  })

  router.get("/cat-list", (req, res)=> {

    User.find({}, (err, users)=> {
      res.render("cat-list", {users: users})
    })
  })

//   router.get("/cats/:id/details", (req,res)=> {
//     debugger
//     let userId = req.params.id


//     User.findById(userId)
//     .then( result => {
   
//         res.render("cats/detailed-cat", {firstUser : result})
//     })
//     .catch(err => {
//         res.send(err)
//    })

// })


module.exports = router;

