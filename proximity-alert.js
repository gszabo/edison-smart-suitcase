var wyliodrin = require("wyliodrin");

module.exports = {

    startRun: function() {
        var i = 0;
        var self = this;

        setInterval(function() {
          var reading = wyliodrin.analogRead(0);
          self.alert = reading > 200;
        }, 500);
    },

    isTooClose: function() {
        return this.alert;
    }
}