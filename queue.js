

var stepQueue = [];

var lastVelocity = {
  x: 0,
  y: 0,
  z: 0
};

var lastTimeStamp;

var queue = {

    addRawSensorData: function(sensorData) {
        //console.log('timeStamp', sensorData.timeStamp);
        if (sensorData.linear) {
          var acceleroReading = sensorData.linear;
          console.log('accelerometer', acceleroReading);

          var dx, dy, dz, vx, vy, vz, dt;

          dt = lastTimeStamp ? sensorData.timeStamp - lastTimeStamp : 0;

          console.log('dt', dt);

          vx = lastVelocity.x + acceleroReading.x * dt;
          vy = lastVelocity.y + acceleroReading.y * dt;
          vz = lastVelocity.z + acceleroReading.z * dt;

          dx = (lastVelocity.x + vx) / 2 * dt;
          dy = (lastVelocity.y + vy) / 2 * dt;
          dz = (lastVelocity.z + vz) / 2 * dt;

          console.log('vx', vx);
          console.log('vy', vy);
          console.log('vz', vz);

          var step = {
            x: dx,
            y: dy,
            z: dz,
            direction: [dx, dy, dz],
            displacement: Math.sqrt(dx*dx + dy*dy + dz*dz)
          };
          stepQueue.push(step);

          lastTimeStamp = sensorData.timeStamp;
          lastVelocity.x = vx;
          lastVelocity.y = vy;
          lastVelocity.z = vz;
        }
    },

    nextStepAggregate: function() {

      if (stepQueue.length === 0) {
        return null;
      }

      var sum = stepQueue.reduce(function (prev, curr) {
        return {
          x: prev.x + curr.x,
          y: prev.y + curr.y,
          z: prev.z + curr.z,
        };
      }, {x: 0, y: 0, z: 0});

      sum.direction = [sum.x, sum.y, sum.z];
      sum.displacement = Math.sqrt(sum.x*sum.x + sum.y*sum.y + sum.z*sum.z);

      stepQueue = [];

      return sum;
    }

};

module.exports = queue;
