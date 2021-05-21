const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const homeController = {
  getAccount: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned currC currW currA currS';

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
        details.charOwned = result.charOwned;
        details.armOwned = result.armOwned;
        details.weapOwned = result.weapOwned;
        details.shieldOwned = result.shieldOwned;
        details.currC = result.currC;
        details.currW = result.currW;
        details.currA = result.currA;
        details.currS = result.currS;


        console.log(details);
        res.render('account', details);
      }
      else {
        res.render('error', details);
      }
    });
  },
  changeUsername: function(req, res) {
    var username = req.session.username;
    var new_username = req.body.new_username;
    if(username == req.params.username)
      db.updateOne(users, {username: username}, { $set: {username: new_username} }, function (flag) {
      if (flag) {
        console.log('usernameChanged');
      }
      else{
        console.log(flag);
      }
    });    
  },
  changePassword: function(req, res) {
    var username = req.session.username;
    var new_password = req.body.new_password;
    if(username == req.params.username)
      db.updateOne(users, {username: username}, { $set: {password: new_password} }, function (flag) {
      if (flag) {
        console.log('passwordChanged');
      }
      else{
        console.log(flag);
      }
    });    
  },
  changeStatus: function(req, res) {
    var username = req.session.username;
    var new_status = req.body.new_status;
    if(username == req.params.username)
      db.updateOne(users, {username: username}, { $set: {status: new_status} }, function (flag) {
      if (flag) {
        console.log('statusChanged');
      }
      else{
        console.log(flag);
      }
    });    
  }
  updateCurr: function(req, res) {
    var username = req.session.username;
    var currS = req.body.currS;
    var currA = req.body.currA;
    var currW = req.body.currW;
    var currC = req.body.currC;

    if(username == req.params.username)
      db.updateMany(users, {username: username}, { $set: {currC: currC , currA: currA , currW : currW , currS : currS} }, function (flag) {
      if (flag) {
        console.log('statusChanged');
      }
      else{
        console.log(flag);
      }
    });    
  }
}

module.exports = homeController;