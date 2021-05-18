const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const homeController = {
  getAccount: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username armOwned weapOwned shieldOwned';

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
        details.armOwned = result.armOwned;
        details.weapOwned = result.weapOwned;
        details.shieldOwned = result.shieldOwned;
        console.log(details);
        res.render('account', details);
      }
      else {
        res.render('error', details);
      }
    });
  },
  changeUsername: function(req, res) {

  },
}

module.exports = homeController;