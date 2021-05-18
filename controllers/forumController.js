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
              var date = new Date(result[i].postedAt);
              result[i].postedAt = date.toLocaleString();
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

  getAddDiscussion: function(req, res) {
    var username = req.query.username;
    var profpic = req.query.profpic;
    var title = req.query.title;
    var content = req.query.content;
    var discussion = {
      username: username,
      profpic: profpic,
      title: title,
      content: content,
      rating: 0
    };

    db.insertOne(ForumDiscussion, discussion, function(flag) {
      if (flag) {
        console.log('Added ' + discussion.title);
      }
    });
  }
}

module.exports = forumController;
