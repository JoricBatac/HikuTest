var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    tier: {
        type: String,
        required: false
    },
    profpic: {
        type: Number,
        required: false
    },
    tierProgress: {
        type: Number,
        required: false
    },
    armOwned: [{type: Number, required: false}],
    weapOwned: [{type: Number, required: false}],
    shieldOwned: [{type: Number, required: false}],
    charOwned: [{type: Number, required: false}],
    currC: {
        type: Number,
        required: false
    },
    currW: {
        type: Number,
        required: false
    },
    currA: {
        type: Number,
        required: false
    },
    currS: {
        type: Number,
        required: false
    },
    task: {
    //end date
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);
