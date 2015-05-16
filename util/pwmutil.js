var mra = require('mraa');

module.exports = {
    playSound: function(port, frequence, interval) {
        var pwm = new mra.Pwm(port);

        pwm.enable(true);
        pwm.period_us(interval);
        pwm.write(frequence);
    },

    stopSound: function(port) {
        var pwm = new mra.Pwm(port);
        pwm.enable(false);
    },

    rotateServo: function(port, angle) {
        var pwm = new mra.Pwm(port);

        pwm.enable(true);
        // 20 ms
        pwm.period_us(20000);
        var dutyCycle = (angle/180 + 1.5) / 20;

        pwm.write(dutyCycle);
        setTimeout(function() { pwm.enable(false); }, 5000);
    }
};