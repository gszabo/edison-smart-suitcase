
"use strict";

/* Raspberry Pi Pins

   Keep the board with the pins and SD card facing upwards.
   The pin are the following:

         +-----+
   3.3 V | * * | 5 V
       8 | * * | 5 V
       9 | * * | GND
       7 | * * | 15
    GND  | * * | 16
       0 | * * | 1
       2 | * * | GND
       3 | * * | 4
  3.3 V  | * * | 5
      12 | * * | GND
      13 | * * | 6
      14 | * * | 10
     GND | * * | 11
         +-----+
*/

var wyliodrin = require ('wyliodrin');

// define the pin number that has the LED connected
var LED_PIN = 5;

// we set the first value for the led
var value = wyliodrin.HIGH;

function main ()
{
	console.log ("Led on pin "+LED_PIN+" should blink");

	// Setup the pin in output mode, so that we can write a value on it
	wyliodrin.pinMode (LED_PIN, wyliodrin.OUTPUT);

	console.log ("Press the Stop button to stop");
	// Loop forever until, we press stop
	// javascript has no delay function, so we need to simulate it
	// using a timer
	// setInterval will call the function inside each 500ms
	setInterval (function ()
	{
		// Write the value on the pin so that the LED turns on or off
		wyliodrin.digitalWrite (LED_PIN, value);
		// Set the next value for the pin
		if (value ==wyliodrin.HIGH) value = wyliodrin.LOW;
		else value = wyliodrin.HIGH;
	}, 500);
}

main ();
