var mongoose = require('mongoose');

var forumDiscussionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profpic: {
        type: Number,
        required: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    rating: {
        type: Number
    }
    /*   schema within a schema?
    comments: [{
        type:
    }]
    */
});

module.exports = mongoose.model('ForumDiscussion', forumDiscussionSchema);
