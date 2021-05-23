const moment = require('moment');

const mongoose = require('mongoose');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
//const ForumDiscussion = require('../models/ForumDiscussionModel.js');
const ForumExplore = require('../models/ForumExploreModel.js');

const forumExploreController = {

  getForumExplore: function(req, res) {
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

        ForumExplore.find({},).exec((err, result) => {

          if (err) {
            console.log('Explore posts load error');
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
            details.posts = result ;
            details.posts.reverse();
            res.render('forumExplore', details);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });
  }
}

module.exports = forumExploreController;
