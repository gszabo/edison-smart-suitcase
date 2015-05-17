
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
var sumDist = 0;


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

        var step = queue.nextStepAggregate();
        if (step) {
          //console.log('rotating', step.direction);
          //agent.rotate(step.direction);
          //console.log(step.displacement);
          //agent.move(step.displacement);
          if (step.displacement < 0) {
            console.log('NANA', step.displacement);
          }
          sumDist += step.displacement;
          console.log('sumDist', sumDist);
        }
        break;

      case STATES.HALTED:
        console.log('STOP');

        agent.speak();
        break;
  }


}, 200);
