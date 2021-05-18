const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const homeController = {
  getHome: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username';

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
        details.tier = result.tier;
        details.status = result.status;
        details.profpic = result.profpic;

        res.render('home', details);
      }
      else {
        res.render('error', details);
      }
    });
  }
}

module.exports = homeController;
