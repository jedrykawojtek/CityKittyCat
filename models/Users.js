const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('users', new Schema({
    username: String,
    password: String,
    email: String,
    streetName: String,
    catDetails: { 
        name: String,
        age: Number,
        gender: String,
        furColour: String,
        favouriteMusic: String,
        favouriteFood: String,
        favouriteTvShow: String,
        favouriteGame: String,
        yoga: Boolean,
        scratching: Boolean,
        purring: Boolean
    },
    catSitter: { ref:"users", type:mongoose.Types.ObjectId }
    
}))

// mongoose.Schema.Types.Boolean.convertToTrue.add('on')
// mongoose.Schema.Types.Boolean.convertToFalse.add(undefined)

module.exports = User;


 // streetName: String,
    // catDetails: { 
    //     name: String,
    //     age: Number,
    //     gender: String,
    //     favouriteMusic: String,
    //     favouriteFood: String,
    //     furColour: String,
    //  }