const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const homeController = {
  getAccount: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username armOwned weapOwned shieldOwned currChar currWeap currArmor currShield';

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

        console.log(result);
        res.render('account', result);
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