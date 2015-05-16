var dgram = require('dgram');
var BufferReader = require('buffer-reader');
var s = dgram.createSocket('udp4');
var queue = require('./queue');

var SENSORS = {
    ACCELEROMETER: '3',
    GYROSCOPE: '4',
    MAGNETOMETER: '5',
    ORIENTATION: '81',
    GRAVITY: '83',
    LINEARACCELEROMETER: '82'
}

function injectSensorData(sensor, msg) {
  var sensorIndex = msg.indexOf(sensor);

  // console.log(msg, sensorIndex, sensor);

  if (sensorIndex !== -1) {
    return {
        x: parseFloat(msg[sensorIndex + 1]),
        y: parseFloat(msg[sensorIndex + 2]),
        z: parseFloat(msg[sensorIndex + 3])
    };
  }
}

s.on('message', function(msg, rinfo) {
    msg = msg.toString('utf8').split(',').map(function(item) { return item.trim(); });

  var sensorData = {
    timeStamp: parseFloat(msg[0]),
    accelerometer: injectSensorData(SENSORS.ACCELEROMETER, msg),
    gyroscope: injectSensorData(SENSORS.GYROSCOPE, msg),
    magnetometer: injectSensorData(SENSORS.MAGNETOMETER, msg),
    orientation: injectSensorData(SENSORS.ORIENTATION, msg),
    gravity: injectSensorData(SENSORS.GRAVITY, msg),
    linear: injectSensorData(SENSORS.LINEARACCELEROMETER, msg)
  };

  queue.addRawSensorData(sensorData);
});

s.on("listening", function () {
  var address = s.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

s.on("error", function () {
  console.log('error', arguments);
});

s.on("close", function () {
  console.log('close', arguments);
});

s.bind(80, '0.0.0.0');