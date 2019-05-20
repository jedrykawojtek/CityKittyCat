/*
    catOwner: _id
    startDate
    endDate
    typeSitter
    sitter: _id
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Request = mongoose.model('requests', new Schema({
    catOwner: { ref:"users", type:mongoose.Types.ObjectId },
    type: {
        catSitting: Boolean,
        housesitting: Boolean,
        catBoarding: Boolean,
        houseVisit: Boolean,
     },
    catSitter: { ref:"users", type:mongoose.Types.ObjectId }
}))

module.exports = Request;
