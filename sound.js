
var actualSound;
/*var modulator;
var maxFrequency=220;
var minFrequency=0;
var maxSound= 220;
var minSound=-220;*/

function setup() {
    
    actualSound=new p5.Oscillator();
    actualSound.setType("sine");
    actualSound.amp(1);
    actualSound.freq(400);
    actualSound.start();
}

/*function realAudio()
{
  carrier.amp() 
}*/