const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumDiscussion = require('../models/ForumDiscussionModel.js');

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

        ForumDiscussion.find({},).exec((err, result) => {
          if (err) {
            console.log('discussion posts load error');
          }
          else {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            for (var i = 0; i < result.length; i++) {
              /*
              var date = new Date(result[i].postedAt);
              result[i].postedAt = date.toLocaleString();
              */
              var date = new Date(result[i].postedAt);
              result[i].postedAt = moment(date).fromNow();
            }
            details.posts = result;
            details.posts.reverse();
            res.render('forum', details);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  },

  postDiscussion: function(req, res) {
    var username = req.session.username;
    var profpic = parseInt(req.body.profpic);
    var title = req.body.title;
    var content = req.body.content;
    var discussion = {
      username: username,
      profpic: profpic,
      title: title,
      content: content,
      rating: 0
    };
    console.log(discussion);
    db.insertOne(ForumDiscussion, discussion, function(flag) {
      if (flag) {
        console.log('Added ' + discussion.title);
      }
    });
  },

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

        res.render('forumpost', details);
      }
      else {
        res.render('error', details);
      }
    });
  }

  /*
  getLikePost: function(req, res) {
    db.updateOne(ForumDiscussion, )
  }*/
}

module.exports = forumController;
