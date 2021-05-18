const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const registerController = {

  getRegister: function(req, res) {
    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.username = req.session.username;
    }
    else {
      details.flag = false;
    }
    console.log('waowao');
    res.render('register', details);
  },
  postRegister: function(req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors = errors.errors;

      var details = {};

      if (req.session.username) {
        details.flag = true;
        details.username = req.session.username;
      }
      else {
        details.flag = false;
      }

      for (var i = 0; i < errors.length; i++)
        details[errors[i].param + 'Error'] = errors[i].msg;

      res.render('register', details);
    }
    else {
      var username = req.body.username;
      var password = req.body.password;

      bcrypt.hash(password, saltRounds, function(err, hash) {
        var user = {
          username: username,
          password: hash,
          status: 'Welcome to Hiku!',
          tier: 1,
          level: 1,
          profpic:1
        }

        db.insertOne(User, user, function(flag) {
          if (flag) {
            res.redirect('/success?username=' + username);
          }
        });
      });
    }
  },
  getCheckUsername: function(req, res) {
    var username = req.query.username;

    db.findOne(User, {username: username}, 'username', function (result) {
      res.send(result);
    });
  }
}

module.exports = registerController;
