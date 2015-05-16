
"use strict";

var wyliodrin = require("wyliodrin");
var pwmutil = require('./util/pwmutil');

//var connection = require('./phone-connection');


var i = 0;
setInterval(function() {
  var reading = wyliodrin.analogRead(0);

  if (reading > 200) {
    console.log(reading + ' STOP ' + i++);
  }
}, 500);

