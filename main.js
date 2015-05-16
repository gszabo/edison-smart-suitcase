
"use strict";

var wyliodrin = require("wyliodrin");

//var connection = require('./phone-connection');


var i = 0;
setInterval(function() {
  var reading = wyliodrin.analogRead(0);

  if (reading > 200) {
    console.log(reading + ' STOP ' + i++);
  }
}, 500);

var buzzer = new jsupm_buzzer.Buzzer(3);
buzzer.playSound(3300, 1000);
