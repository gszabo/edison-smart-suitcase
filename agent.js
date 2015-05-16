var mra = require('mraa');
var wyliodrin = require('wyliodrin');

var HANDLERS = {
    SOUND: new mra.Pwm(3),
    ROTATIONSERVO: new mra.Pwm(5)
};

module.exports = {
    init: function() {
        var self = this;

        setInterval(function() {
          var reading = wyliodrin.analogRead(0);
          self.alert = reading > 200;
        }, 500);
    },

    isTooClose: function() {
        return this.alert;
    },

    speak: function() {
        HANDLERS.SOUND.enable(true);
        HANDLERS.SOUND.period_us(50000);
        HANDLERS.SOUND.write(0.8);
    },

    shutUp: function() {
        HANDLERS.SOUND.enable(false);
    },

    rotate: function(angle) {
        var pwm = new mra.Pwm(port);

        HANDLERS.SOUND.enable(true);
        // 20 ms
        HANDLERS.SOUND.period_us(20000);
        var dutyCycle = (angle/180 + 1.5) / 20;

        HANDLERS.SOUND.write(dutyCycle);
    },

    move: function(port, distance) {
        console.log('are you kidding :)... moving to ' + distance);
    }
};