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
  getRegisterAcc: function(req, res) {
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
      var username = req.query.username;
      var password = req.query.password;
      console.log('hello');
      var img_index = parseInt(req.body.img_index);

      bcrypt.hash(password, saltRounds, function(err, hash) {
        var user = {
          username: username,
          password: hash,
          status: 'Welcome to Hiku!',
          tier: 0,
          tierProgress: 1,
          profpic: img_index,
          charOwned: [0,1],
          armOwned: [0],
          weapOwned: [0],
          shieldOwned: [0]
        }
        console.log('hello');
        db.insertOne(User, user, function(flag) {
          if (flag) {
            res.redirect('/success?username=' + username);
          }
          else{
            console.log(':(')
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
