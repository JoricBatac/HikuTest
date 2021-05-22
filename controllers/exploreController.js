const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const exploreController = {
  getExplore: function(req, res) {
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

        var location = [
        {
          loc_filename : "ex_thumb_bg",
          loc_title : "Yuchengco Building",
          loc_loot : "UniQlo",
          loc_desc : "Before the ECQ, this building housed the Senior High School of the De La Salle University. It had never been visited by the students of the College of Computer Studies as it is too far away from their own building, Gokongwei."
        },
        {
          loc_filename : "ex_thumb_bg1",
          loc_title : "Gil Puyat Station",
          loc_loot : "Iron Suit",
          loc_desc : "Commonly mistaken as \"Pedro Gil Station\", Gil Puyat Station is a hotspot for pickpocketers, or colloquially known as \"mandurukot\". Many players use this location in battling each other because of its notoriety. "
        },

        {
          loc_filename : "ex_thumb_bg2",
          loc_title : "Akihabara",
          loc_loot : "Leather Tunic",
          loc_desc : "Named after Akihiko Matsubara, the creator of Tanti. Because of that Akihabara frequently gets attacked by the Tanti. Explore this location at your own risk! "
        },

        {
          loc_filename : "ex_thumb_bg3",
          loc_title : "The Land of Oompa",
          loc_loot : "Wooden Bow",
          loc_desc : "This location has been sequestered by Feene Ishlaighn, and his big red dog, Jay Quearie. Help them defeat the monsters approaching their kingdom. "
        },

        {
          loc_filename : "ex_thumb_bg4",
          loc_title : "Shore Top",
          loc_loot : "Ivy Shield",
          loc_desc : "Best location to explore seafood. During high tide, you may need to be at a higher tier to obtain swimming skills. "
        },

      
        ]

        details.location = location;
        console.log(details);
        res.render('explore', details);
      }
      else {
        res.render('error', details);
      }
    });
  },
}

module.exports = exploreController;
