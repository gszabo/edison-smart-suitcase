var exec = require('child_process').exec;

module.exports = {
    playBuzzer: function(interval) {
      exec('echo 1 > /sys/class/pwm/pwmchip0/pwm0/enable');
      setTimeout(function() { exec('echo 0 > /sys/class/pwm/pwmchip0/pwm0/enable'); }, interval);
    }
};