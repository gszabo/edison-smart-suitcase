
"use strict";

var pwmutil = require('./util/pwmutil');
var queue = require('./queue');
var connection = require('./phone-connection');
var proximityAlert = require('./proximity-alert');

var STATES = {
  FOLLOWING: 1,
  HALTED: 2
};

var state = STATES.FOLLOWING;

proximityAlert.startRun();

setInterval(function() {

    if (proximityAlert.isTooClose()) {
      state = STATES.HALTED;
    } else {
        state = STATES.FOLLOWING;
        queue.nextStep();
    }

    switch (state) {

      case STATES.FOLLOWING:
        pwmutil.stopSound(3);
        console.log('FOLLOWING');
        break;

      case STATES.HALTED:
        console.log('STOP');
        pwmutil.playSound(3, 0.6, 50000);
        break;
  }


}, 200);