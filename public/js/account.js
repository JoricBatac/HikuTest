var charNames = ["Aaron", "Rickjaw", "Shua", "Cram", "Rog"];
var charStat = [];
charStat[0] = {
  hp    : 100,
  att : 45,
  def : 50
};
charStat[1] = {
  hp    : 100,
  att : 75,
  def : 50
};
charStat[2] = {
  hp    : 100,
  att : 20,
  def : 80
};
charStat[3] = {
  hp    : 100,
  att : 50,
  def : 50
};
charStat[4] = {
  hp    : 100,
  att : 90,
  def : 10
};

var weaponNames = ["Short Sword", "Wooden Bow", "Warhammer", "Nurse's Claymore", "Death's Arm"];
var weapMStat = [50,25,75,75,125];
var weapSStat = [];
weapSStat[0] = {
  type : "def",
  val   : 5
};
weapSStat[1] = {
  type : "att",
  val : 5
};
weapSStat[2] = {
  type : "def",
  val : -10
};
weapSStat[3] = {
  type : "hp",
  val : 50
};
weapSStat[4] = {
  type : "hp",
  val : -30
};

var shieldNames = ["Wooden Plate", "Spiked Guard", "Ivy Shield", "Iron Buckler", "Medusa"];
var shieldMStat = [10,50,25,55,75];
var shieldSStat = [];
shieldSStat[0] = {
  type : "def",
  val   : 2
};
shieldSStat[1] = {
  type : "att",
  val : 25
};
shieldSStat[2] = {
  type : "hp",
  val : -10
};
shieldSStat[3] = {
  type : "att",
  val : 5
};
shieldSStat[4] = {
  type : "def",
  val : 15
};

var armorNames = ["Leather Tunic", "Chainmail", "Knight's Armor", "Uniqlo", "Iron Suit"];
var armMStat = [10,50,75,5,100];
var armSStat = [];
armSStat[0] = {
  type : "def",
  val   : 5
};
armSStat[1] = {
  type : "att",
  val : 10
};
armSStat[2] = {
  type : "att",
  val : -10
};
armSStat[3] = {
  type : "hp",
  val : 275
};
armSStat[4] = {
  type : "hp",
  val : -50
};

function loadoutChange(slot, order) {
  switch (slot) {
    case 1:
      if (order == 1) {
        if (currChar != charOwned.length - 1) currChar += 1;
        else currChar = 0;
      }
      else {
        if (currChar != 0) currChar -= 1;
        else currChar = charNames.length - 1;
      }
      document.getElementById("charName").innerHTML = charNames[currChar];
      break;
    case 2:
      if (order == 1) {
        if (currWeapon != weaponNames.length - 1) currWeapon += 1;
        else currWeapon = 0;
      }
      else {
        if (currWeapon != 0) currWeapon -= 1;
        else currWeapon = weaponNames.length - 1;
      }
      document.getElementById("weaponName").innerHTML = weaponNames[currWeapon];
      break;
    case 3:
      if (order == 1) {
        if (currShield != shieldNames.length - 1) currShield += 1;
        else currShield = 0;
      }
      else {
        if (currShield != 0) currShield -= 1;
        else currShield = shieldNames.length - 1;
      }
      document.getElementById("shieldName").innerHTML = shieldNames[currShield];
      break;
    case 4:
      if (order == 1) {
        if (currArmor != armorNames.length - 1) currArmor += 1;
        else currArmor = 0;
      }
      else {
        if (currArmor != 0) currArmor -= 1;
        else currArmor = armorNames.length - 1;
      }
      document.getElementById("armorName").innerHTML = armorNames[currArmor];
      break;
  }
  checkStat();
}

$(document).ready(function () {
    $


    $('#usernameHolder').keyup(function () {

          var username = $('#usernameHolder').val();

        $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username != username) {
              $('#usernameHolder').css('background-color', '#9CD9BF');
              $('#changeUsername').prop('disabled', false);
              $('#error1').text('');
            }
            else {
              $('#usernameHolder').css('background-color', '#FF6A55');
              $('#changeUsername').prop('disabled', true);
              $('#error1').text('Username taken!');
            }
        });
    });
    $('#changeUsername').click(function () {

    if($('#usernameHolder').val()){
        var name = $('#usernameHolder').val();

        $.get('/changeName', {name: name}, function (result) {
            console.log('username changed to ' + name);
        });
    }
    else{
        $('#error1').text('Please fill up the field.');
    }
    });
    $('#userHead').click(function () {
        $('#usernameBox').css('height', '175px');
        $('#usernameBox').css('opacity', '1');
        $('#passwordBox').css('height', '60px');
        $('#passwordBox').css('opacity', '0.3');
        $('#statusBox').css('height', '60px');
        $('#statusBox').css('width', '300px');
        $('#statusBox').css('opacity', '0.3');

        if($('#usernameBox').height() > 60){
            $('#usernameBox').css('height', '60px');
            $('#usernameBox').css('opacity', '0.3');
        }
    });
    $('#passHead').click(function () {
        $('#usernameBox').css('height', '60px');
        $('#usernameBox').css('opacity', '0.3');
        $('#passwordBox').css('height', '175px');
        $('#passwordBox').css('opacity', '1');
        $('#statusBox').css('height', '60px');
        $('#statusBox').css('width', '300px');
        $('#statusBox').css('opacity', '0.3');
        if($('#passwordBox').height() > 60){
            $('#passwordBox').css('height', '60px');
            $('#passwordBox').css('opacity', '0.3');
        }
    });
    $('#statHead').click(function () {
        $('#usernameBox').css('height', '60px');
        $('#usernameBox').css('opacity', '0.3');
        $('#passwordBox').css('height', '60px');
        $('#passwordBox').css('opacity', '0.3');
        $('#statusBox').css('height', '175px');
        $('#statusBox').css('width', '500px');
        $('#statusBox').css('opacity', '1');
        if($('#statusBox').height() > 60){
            $('#statusBox').css('height', '60px');
            $('#statusBox').css('opacity', '0.3');
            $('#statusBox').css('width', '300px');
        }
    });
    $('#loadoutHead').click(function () {
        $('#loadoutBox').css('height', '585px');
        $('#loadoutBox').css('opacity', '1');
        if($('#loadoutBox').height() > 60){
            $('#loadoutBox').css('height', '60px');
            $('#loadoutBox').css('opacity', '0.3');
        }
    });

});
