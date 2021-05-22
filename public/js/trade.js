/*
    var weapOwned = [];
    var armOwned = [];
    var shieldOwned = [];
    var charOwned = []; 

    charOwned = {{{json charOwned}}};
    armOwned = {{{json armOwned}}};
    shieldOwned = {{{json shieldOwned}}};
    weapOwned = {{{json weapOwned}}};

    var charNames = ["Aaron", "Rickjaw", "Shua", "Cram", "Rog"];
    var weaponNames = ["Short Sword", "Wooden Bow", "Warhammer", "Nurse's Claymore", "Death's Arm"];
    var shieldNames = ["Wooden Plate", "Spiked Guard", "Ivy Shield", "Iron Buckler", "Medusa"];
    var armorNames = ["Leather Tunic", "Chainmail", "Knight's Armor", "Uniqlo", "Iron Suit"];

    var types = ["Character","Weapon","Shield","Armor"];
    var currChar = 0, currWeapon = 0, currShield = 0; currArmor = 0, slot = 0;
*/

function post(){
  alert("Posted in forum!");
}
function accept(){
  alert("Trade Accepted!");
}
var tslot = 1;
function plus(){
  if(tslot==1){
    document.getElementById("cont2").style.height = "100px";
    document.getElementById("cont2").style.marginTop = "15px";
    tslot++;
  }
  else if(tslot == 2){
    document.getElementById("cont3").style.height = "100px";
    document.getElementById("cont3").style.marginTop = "15px";
    tslot++;
  }
  else if(tslot == 3){
    document.getElementById("cont4").style.height = "100px";
    document.getElementById("cont4").style.marginTop = "15px";
    tslot = 0;
  }
  else if(tslot == 0){
    document.getElementById("cont2").style.height = 0;
    document.getElementById("cont2").style.marginTop = 0;
    document.getElementById("cont3").style.height = 0;
    document.getElementById("cont3").style.marginTop = 0;
    document.getElementById("cont4").style.height = 0;
    document.getElementById("cont4").style.marginTop = 0;
    tslot++;
  }
}
var weapOwned = [];
var armOwned = [];
var shieldOwned = [];
var charOwned = [];  

var charNames = ["Aaron", "Rickjaw", "Shua", "Cram", "Rog"];
var weaponNames = ["Short Sword", "Wooden Bow", "Warhammer", "Nurse's Claymore", "Death's Arm"];
var shieldNames = ["Wooden Plate", "Spiked Guard", "Ivy Shield", "Iron Buckler", "Medusa"];
var armorNames = ["Leather Tunic", "Chainmail", "Knight's Armor", "Uniqlo", "Iron Suit"];
var types = ["Character","Weapon","Shield","Armor"];

var currChar = 0, currWeapon = 0, currShield = 0; currArmor = 0, slot = 0;
function changeSlot(order, space){
  if (order == 1) {
    if (slot != 3) slot += 1;
    else slot = 0;
  }
  else {
    if (slot != 0) slot -= 1;
    else slot = 3;
  }

  if(space == 1)
    document.getElementById("slotname1").innerHTML = types[slot];
  else if(space == 2)
    document.getElementById("slotname2").innerHTML = types[slot];
  else if(space == 3)
    document.getElementById("slotname3").innerHTML = types[slot];
  else if(space == 4)
    document.getElementById("slotname4").innerHTML = types[slot];

  if(slot == 0){
    changeCharName(space);
  }
  else if (slot == 1){
    changeWeapName(space);
  }
  else if (slot == 2){
    changeShiName(space);
  }
  else {
    changeArmName(space);
  }
}

function changeCharName (space){
  if(space == 1)
    document.getElementById("name1").innerHTML = charNames[charOwned[currChar]];
  if(space == 2)
    document.getElementById("name2").innerHTML = charNames[currChar];
  if(space == 3)
    document.getElementById("name3").innerHTML = charNames[currChar];
  if(space == 4)
    document.getElementById("name4").innerHTML = charNames[currChar];
}

function changeWeapName (space){
  if(space == 1)
    document.getElementById("name1").innerHTML = weaponNames[weapOwned[currWeapon]];
  if(space == 2)
    document.getElementById("name2").innerHTML = weaponNames[currWeapon];
  if(space == 3)
    document.getElementById("name3").innerHTML = weaponNames[currWeapon];
  if(space == 4)
    document.getElementById("name4").innerHTML = weaponNames[currWeapon];
}

function changeShiName (space){
  if(space == 1)
    document.getElementById("name1").innerHTML = shieldNames[currShield];
  if(space == 2)
    document.getElementById("name2").innerHTML = shieldNames[currShield];
  if(space == 3)
    document.getElementById("name3").innerHTML = shieldNames[currShield];
  if(space == 4)
    document.getElementById("name4").innerHTML = shieldNames[currShield];
}
function changeArmName (space){
  if(space == 1)
    document.getElementById("name1").innerHTML = armorNames[currArmor];
  if(space == 2)
    document.getElementById("name2").innerHTML = armorNames[currArmor];
  if(space == 3)
    document.getElementById("name3").innerHTML = armorNames[currArmor];
  if(space == 4)
    document.getElementById("name4").innerHTML = armorNames[currArmor];
}

var expanded = 0;
function changeContent(item){
  if(expanded == 0){
    document.getElementById("itemdisp").style.width = "1400px";
    document.getElementById("itemdisp").style.opacity = 1;
    expanded = 1;
  }
  else if(expanded == 1){
    document.getElementById("itemdisp").style.width = "0px";
    document.getElementById("itemdisp").style.opacity = 0;
    expanded = 0;
  }

  if(item == 0){
    setTimeout(function() {
      document.getElementById("dispitem").innerHTML = "Bow of Aaron and Nora-A's shield";
      document.getElementById("offers").innerHTML = "Bronze Sword";
    }, 200);
  }

  if(item == 1){
    setTimeout(function() {
      document.getElementById("dispitem").innerHTML = "Sword of Yesh";
      document.getElementById("offers").innerHTML = "Buckler";
    }, 200);
  }

  if(item == 2){
    setTimeout(function() {
      document.getElementById("dispitem").innerHTML = "Bow of Aaron and Nora-A's shield";
      document.getElementById("offers").innerHTML = "Brine's Greatsword";
    }, 200);
  }
}
