const moment = require('moment');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Trade = require('../models/TradeModel.js');

const tradeController = {

  getTrade: function(req, res) {
    var query = {username: req.params.username};

    var projection = 'username charOwned armOwned weapOwned shieldOwned';
    var projection2 = 'username itemName itemType itemIndex tradeOffers'
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
        details.itemType = result.itemType;
        details.itemIndex = result.itemIndex;
        details.tradeOffers = result.tradeOffers;

        console.log(result.tradeOffers);
      }
    });
    db.findOne(User, query, projection, function(result) {
      if (result != null) {
        details.username = result.username;
        details.charOwned = result.charOwned;
        details.armOwned = result.armOwned;
        details.weapOwned = result.weapOwned;
        details.shieldOwned = result.shieldOwned;

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
      offerName : "Brines Pogi",
      offerIndex : 0,
      offerType : 0
    }
    var trade = {
          username: username,
          itemName: itemName,
          itemType: itemType,
          itemIndex: itemIndex,
          tradeOffers:[offer]
        }

    if(itemType==0)
    db.updateOne(User, {username: username}, { $pull: {charOwned: itemIndex} }, function (flag) {
        if (flag) {
          console.log('removed ' + itemIndex);
          res.redirect('/trade/' + username);
        }
        else{
          console.log('char '+flag);
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
  },
  acceptTrade: function(req, res) {
    var username = req.query.username;
    var usernameOfferer = req.query.usernameOfferer;
    var itemType = req.query.itemType;
    var itemIndex = req.query.itemIndex;
    var offerType = req.query.offerType;
    var offerIndex = req.query.offerIndex;
    console.log('hallo');
        db.deleteOne(Trade, {username:username}, (err,result) => {
            if(err) {
              console.error(err);
            }
            else{
              console.log(':)');
            }
        });
        if(itemType==0)
          db.updateOne(User, {username: username}, { $push: {charOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + itemIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log('char '+flag);
              }
            });
        if(itemType==1)
          db.updateOne(User, {username: username}, { $push: {weapOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + itemIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
        if(itemType==2)
          db.updateOne(User, {username: username}, { $push: {shieldOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + itemIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
        if(itemType==3)
          db.updateOne(User, {username: username}, { $push: {armOwned: itemIndex} }, function (flag) {
              if (flag) {
                console.log('pushed ' + itemIndex);
                res.redirect('/trade/' + username);
              }
              else{
                console.log(flag);
              }
            });
  },
  getCheckTrade: function(req, res) {
    var username = req.query.username;
    console.log('entered check trade');
    db.findOne(Trade, {username: username}, 'username', function (result) {
      res.send(result);
    });
  }
}

module.exports = tradeController;
