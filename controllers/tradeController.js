const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Trade = require('../models/TradeModel.js');

const tradeController = {

  getTrade: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned';
    var projection2 = 'username itemName tradeOffers'
    var details = {};

    if (req.session.username) {
      details.flag = true;
      details.name = req.session.username;
    }
    else {
      details.flag = false;
    }
    db.findOne(Trade, query, projection2, function(result) {
      if (result != null) {
        details.username = result.username;
        details.itemName = result.itemName;
        details.tradeOffers = result.tradeOffers;

        console.log(result);
      }
    });
    db.findOne(User, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.charOwned = result.charOwned;
        details.armOwned = result.armOwned;
        details.weapOwned = result.weapOwned;
        details.shieldOwned = result.shieldOwned;
        db.findOne(Trade, query, projection2, function(result) {
          if (result != null) {
            details.username = result.username;
            details.itemName = result.itemName;
            details.tradeOffers = result.tradeOffers;

            console.log(details.tradeOffers);
          }
        });
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
    
    var offer = {
      username : username,
      item : itemName,
      offerName : "temp offer",
      offerIndex : 69,
      offerType : 69
    }
    var trade = {
          username: username,
          itemName: itemName,
          itemType: itemType,
          itemIndex: itemIndex,
          tradeOffers:[offer]
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
  if(itemType==1)
    db.updateOne(User, {username: username}, { $pull: {weapOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
  if(itemType==2)
    db.updateOne(User, {username: username}, { $pull: {shieldOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log(flag);
        }
      });
  if(itemType==3)
    db.updateOne(User, {username: username}, { $pull: {armOwned: itemIndex} }, function (flag) {
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
