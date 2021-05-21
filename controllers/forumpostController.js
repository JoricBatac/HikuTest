const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumDiscussion = require('../models/ForumDiscussionModel.js');

const forumpostController = {

  getForumPost: function(req, res) {

    var query = {postID: req.params.postID};

    var projection = 'username profpic postID postedAt title content rating';

    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }

    db.findOne(ForumDiscussion, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;
        details.postID = result.postID;
        details.title = result.title;
        details.content = result.content;
        details.rating = result.rating;

        var date = new Date(result.postedAt);
        details.postedAt = moment(date).fromNow();

        ForumDiscussion.find({},'comments').exec((err, result) => {
          if (err) {
            console.log('comments load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            /*
            for (var i = 0; i < result.length; i++) {
              var date = new Date(result[i].repliedAt);
              result[i].repliedAt = moment(date).fromNow();
            }
            */

            details.replies = result;
            details.replies.reverse();
            console.log(result);
            res.render('forumpost', details);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  postComment: function(req, res) {
    var username = req.session.username;
    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        details.profpic = result.profpic;
        var postID = req.params.postID;

        var profpic = details.profpic;

        var content = req.body.replysubmission;
        if (content == '')
          content = 'No Content';
        var comment = {
          username: username,
          profpic: profpic,
          comment: content,
          rating: 0
        };
        db.updateOne(ForumDiscussion, {postID: postID}, { $push: {comments: comment} }, function (flag) {
          if (flag) {
            res.redirect('/forum/post/' + postID);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  }
}

module.exports = forumpostController;
