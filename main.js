
"use strict";

var queue = require('./queue');
var connection = require('./phone-connection');
var agent = require('./agent');

var STATES = {
  FOLLOWING: 1,
  HALTED: 2
};

var state = STATES.FOLLOWING;

agent.init();

setInterval(function() {

    if (agent.isTooClose()) {
        state = STATES.HALTED;
    } else {
        state = STATES.FOLLOWING;
    }

    switch (state) {

      case STATES.FOLLOWING:
        agent.shutUp();
        console.log('FOLLOWING');

        var step = queue.nextStep();

        break;

      case STATES.HALTED:
        console.log('STOP');

        agent.speak();
        break;
  }


}, 200);