const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const homeController = {
  getHome: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username status tier level profpic task';

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
        details.level = result.level;
        details.profpic = result.profpic;
        details.task = result.task;

        res.render('home', details);
      }
      else {
        res.render('error', details);
      }
    });
  }
}

module.exports = homeController;
