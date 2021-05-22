const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const tradeController = {

  getTrade: function(req, res) {
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

        console.log(details);
        res.render('trade', details);
      }
      else {
        res.render('error', details);
      }
    });
  }
}

module.exports = tradeController;
