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

        ForumDiscussion.findOne({postID: details.postID}, 'comments').exec((err, result) => {
          if (err) {
            console.log('comments load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);

            for (var i = 0; i < result.comments.length; i++) {
              var date = new Date(result.comments[i].repliedAt);
              result.comments[i].repliedAt = moment(date).fromNow();
            }
            details.replies = result.comments;
            //details.replies.reverse();
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
  },

  /*
  postCommentLike: function(req, res) {
    var username = req.session.username;
    var postID = req.body.postID;
    var commentID = req.body.commentID;

    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {

        // if user disliked it, removes dislike and increments post rating
        if (result.dislikedComments.includes(commentID)) {
          db.updateOne(User, {username: username}, { $pull: {dislikedComments: commentID} }, function (flag) {
            if (flag) {
              console.log('Comment: ' + commentID + ' removed from ' + username +'s dislikedComments');
            }
          });
          db.updateOne(User, {username: username}, { $push: {likedComments: commentID} }, function (flag) {
            if (flag) {
              console.log(username + ' Liked Comment: ' + commentID);
            }
          });

          db.findOne(ForumDiscussion, { postID: postID}, { comments: { $elemMatch: { commentID: commentID } } }, function(result) {
            if (result != null) {
              console.log(result);
              var newRating = result.rating + 2;
              db.updateOne(ForumDiscussion, { postID: postID, comments: { $elemMatch: { commentID: commentID } } }, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log('Comment: ' + commentID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
        // if user hasnt liked the post yet
        else if (!result.likedComments.includes(commentID)) {
          db.updateOne(User, {username: username}, { $push: {likedComments: commentID} }, function (flag) {
            if (flag) {
              console.log(username + ' Liked Comment: ' + commentID);
            }
          });
          db.findOne(ForumDiscussion, { postID: postID}, { comments: { $elemMatch: { commentID: commentID } } }, function(result) {
            if (result != null) {
              console.log('a ' + result.rating);
              var newRating = result.rating + 1;
              db.updateOne(ForumDiscussion, { postID: postID, comments: { $elemMatch: { commentID: commentID } } }, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log('Comment: ' + commentID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
        // if user liked the post already, removes like, decrements rating
        else {
          db.updateOne(User, {username: username}, { $pull: {likedComments: commentID} }, function (flag) {
            if (flag) {
              console.log('Comment: ' + commentID + ' removed from ' + username +'s likedComments');
            }
          });
          db.findOne(ForumDiscussion, { postID: postID}, { comments: { $elemMatch: { commentID: commentID } } }, function(result) {
            if (result != null) {
              console.log(result);
              var newRating = result.rating - 1;
              db.updateOne(ForumDiscussion, { postID: postID, comments: { $elemMatch: { commentID: commentID } } }, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log('Comment: ' + commentID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
      }
      else {
        res.render('error', details);
      }
    });
  },

  postCommentDislike: function(req, res) {

  },*/

  getRating: function(req, res) {
    var postID = req.query.postID;
    db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
      res.send(result);
    });
  }
}

module.exports = forumpostController;
