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
        db.insertOne(ForumDiscussion, discussion, function(flag) {
          if (flag) {
            console.log('Added ' + discussion.title);
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
