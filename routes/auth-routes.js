// Authentication
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// require models
const User = require('../models/Users')

// Get Register Route
router.get('/register', (req, res) => {
    res.render('register')

})
// Post Register Route
router.post('/register', (req, res) => {
  debugger
  const bcryptSalt = 10;

  const {username, email, password} = req.body
  if(username == "" || email == ""  || password == "") {
    res.render('register', {errorValidateMsg1: "Please enter credentials"})
    return
  }
  if(password.length < 4 ) {
    res.render('register', {errorValidateMsg2: "Please enter more than 3 characters in your new password"})
    return;
  }

  // // backend veryfication
  User.findOne({ "username": username })
  .then(result => {
    if (result != null) {
      res.render("register", {
        errorMessage: "Name in database already exists"
      })
      return;
    } 
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    })
    newUser.save()
    .then( (user) => {
      debugger
      req.session.user = user
      // req.session.username = user;
      res.redirect('/profile');
    })
    .catch((error) => {
      console.log(`signup server error ${error}`)
    })
  })
  .catch(error => {
    console.log('error', error)
  })
})

// Get Login Route
router.get('/login', (req, res) => {
  console.log(req.session.user)
    if(req.session.user){
        res.redirect("/profile")
        debugger
    } else {
    res.render('login')
    }
})

// Post Login Rout
router.post('/login', (req, res) => {
  User.findOne({email:req.body.email}, (err,user)=> {
    if (!user)
    {
      res.render("login", {
        errorMessage: "Incorrect login information"
      })    
  } else {
      bcrypt.compare(req.body.password, user.password, (err, equal) => {
        if(equal){
         // res.cookie("email", req.body.email, {signed:true})
          //Also set session user._id
          req.session.user = user;
          console.log("Hello",req.session.user)
          debugger;
          res.redirect("/profile")
        }
        else {
          res.render("login", {
            errorMessage: "Incorrect password"
          })
        }
      });
    }
  })
})


router.get('/profile/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})


module.exports = router;



