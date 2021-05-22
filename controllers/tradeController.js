const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Trade = require('../models/TradeModel.js');

const tradeController = {

  getTrade: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned';

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
  },
  postTrade: function(req, res){
    var username = req.session.username;
    var itemName = req.body.itemName;
    var itemType = req.body.itemType;
    var itemIndex = req.body.itemIndex;


    var trade = {
          username: username,
          itemName: itemName,
          itemType: itemType,
          itemIndex: itemIndex,
          tradeOffers:[]
        }

    console.log(trade);
    if(itemType==0)
    db.updateOne(User, {username: username}, { $pull: {charOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
    db.insertOne(Trade, trade, function(flag) {
          console.log(flag);
          if (flag) {
            console.log('trade posted'); 
          }
        });
  }
}

module.exports = tradeController;
