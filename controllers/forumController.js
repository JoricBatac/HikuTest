const moment = require('moment');

const mongoose = require('mongoose');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumDiscussion = require('../models/ForumDiscussionModel.js');
//const ForumBattle = require('../models/ForumBattleModel.js');
//const ForumPosts = require('../models/ForumModel.js');

const forumController = {

  getForum: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username profpic';

    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }
    db.findOne(User, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.profpic = result.profpic;


        User.find({},'discussionPosts').exec((err, result) => {
          if (err) {
            console.log('discussion posts load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            details.posts = [];
            for (var i = 0; i < result.length; i++) {
              for (var j = 0; j < result[i].discussionPosts.length; j++) {
                var date = new Date(result[i].discussionPosts[j].postedAt);
                result[i].discussionPosts[j].postedAt = moment(date).fromNow();
                details.posts.push(result[i].discussionPosts[j]);
              }
            }
            /*
            details.posts = result.discussionPosts;
            console.log(result[0].discussionPosts[1]);
            */
            console.log(details.posts);
            details.posts.reverse();
            res.render('forum', details);

          }
        });

        /*
        ForumDiscussion.find({},).exec((err, result) => {
          if (err) {
            console.log('discussion posts load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
              var date = new Date(result[i].postedAt);
              result[i].postedAt = moment(date).fromNow();
            }
            details.posts = result;
            console.log(result);
            details.posts.reverse();
            res.render('forum', details);

          }
        });*/

        /*
        ForumBattle.find({},).exec((err, result) => {

          if (err) {
            console.log('battle posts load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
              var date = new Date(result[i].postedAt);
              result[i].postedAt = moment(date).fromNow();
            }
            details.posts.push(result);
            details.posts.reverse();
            console.log(result);
            res.render('forum', details);
          }
        });
        */
      }
      else {
        res.render('error', details);
      }
    });
  },

  postDiscussion: function(req, res) {
    var username = req.session.username;
    var details = {};

    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        details.profpic = result.profpic;

        var profpic = details.profpic;
        var title = req.body.title;
        if (title == '')
          title = 'No Title';
        var content = req.body.content;
        if (content == '')
          content = 'No Content';
        var discussion = {
          username: username,
          profpic: profpic,
          title: title,
          content: content,
          comments: [],
          rating: 0,
        };
        /*
        db.insertOne(ForumDiscussion, discussion, function(flag) {
          if (flag) {
            console.log('Added ' + discussion.title);
            res.redirect('/forum/' + username);
          }
        });
        */
        db.updateOne(User, {username: username}, { $push: {discussionPosts: discussion} }, function (flag) {
          if (flag) {
            console.log('Added ' + discussion.title);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  postLike: function(req, res) {
    var username = req.session.username;
    var postID = req.body.postID;

    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {

        // if user disliked it, removes dislike and increments post rating
        if (result.dislikedPosts.includes(postID)) {
          db.updateOne(User, {username: username}, { $pull: {dislikedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(postID + ' removed from ' + username +'s dislikedPosts');
            }
          });
          db.updateOne(User, {username: username}, { $push: {likedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(username + ' Liked ' + postID);
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating + 2;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
        // if user hasnt liked the post yet
        else if (!result.likedPosts.includes(postID)) {
          db.updateOne(User, {username: username}, { $push: {likedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(username + ' Liked ' + postID);
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating + 1;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
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
          db.updateOne(User, {username: username}, { $pull: {likedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(postID + ' removed from ' + username +'s likedPosts');
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating - 1;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
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

  postDislike: function(req, res) {
    var username = req.session.username;
    var postID = req.body.postID;

    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {

        // if user liked it, removes like and decrements post rating
        if (result.likedPosts.includes(postID)) {
          db.updateOne(User, {username: username}, { $pull: {likedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(postID + ' removed from ' + username +'s likedPosts');
            }
          });
          db.updateOne(User, {username: username}, { $push: {dislikedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(username + ' Disliked ' + postID);
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating - 2;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
        // if user hasnt disliked the post yet
        else if (!result.dislikedPosts.includes(postID)) {
          db.updateOne(User, {username: username}, { $push: {dislikedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(username + ' Disliked ' + postID);
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating - 1;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
                }
              });
            }
            else {
              res.render('error', details);
            }
          });
        }
        // if user disliked the post already, removes dislike, increments rating
        else {
          db.updateOne(User, {username: username}, { $pull: {dislikedPosts: postID} }, function (flag) {
            if (flag) {
              console.log(postID + ' removed from ' + username +'s dislikedPosts');
            }
          });
          db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
            if (result != null) {
              var newRating = result.rating + 1;
              db.updateOne(ForumDiscussion, {postID: postID}, { $set: {rating: newRating} }, function (flag) {
                if (flag) {
                  console.log(postID + ' new rating: ' + newRating);
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

  getRating: function(req, res) {
    var postID = req.query.postID;
    db.findOne(ForumDiscussion, {postID: postID}, '', function(result) {
      res.send(result);
    });
  },

  postChallenge: function(req, res) {
    var username = req.session.username;

    var details = {};
    db.findOne(User, {username: username}, '', function(result) {
      if (result != null) {
        var profpic = result.profpic;
        var title = req.body.title;
        if (title == '')
          title = 'No Title';

        var content = 'test content';


        var challenge = {
          username: username,
          profpic: profpic,
          title: title,
          content: content,
          comments: [],
          rating: 0,
        };
        db.insertOne(ForumBattle, challenge, function(flag) {
          if (flag) {
            console.log('Added ' + challenge.title);
            res.redirect('/forum/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });

  }
}

module.exports = forumController;
