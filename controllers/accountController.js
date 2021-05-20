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
  },
}

module.exports = homeController;