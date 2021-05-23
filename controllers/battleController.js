const moment = require('moment');

const mongoose = require('mongoose');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const ForumBattle = require('../models/ForumBattleModel');

const battleController = {

  getBattle: function(req, res) {
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

        var battles = [
          {
            bossName: "Tite",
            level: 69,
            bossImg: 'mob1',
            description: 'tite',
            loot: 'Dildo',
            multiplier: 'aaron'
          },
          {
            bossName: "Tite",
            level: 6969,
            bossImg: 'mob2',
            description: 'tite',
            loot: 'Dildo',
            multiplier: 'aaron'
          },
          {
            bossName: "Tite",
            level: 696969,
            bossImg: 'mob3',
            description: 'tite',
            loot: 'Dildo',
            multiplier: 'aaron'
          },
          {
            bossName: "Tite",
            level: 69696969,
            bossImg: 'mob4',
            description: 'tite',
            loot: 'Dildo',
            multiplier: 'aaron'
          },
          {
            bossName: "Tite",
            level: 6969696969,
            bossImg: 'mob5',
            description: 'tite',
            loot: 'Dildo',
            multiplier: 'aaron'
          }
        ];


        details.battles = battles;
        //console.log(details);

        res.render('battle', details);
      }
      else {
        res.render('error', details);
      }
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
            res.redirect('/forum/battle/' + username);
          }
        });
      }
      else {
        res.render('error', details);
      }
    });

  }
};

module.exports = battleController;
