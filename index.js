//Max Goad and Apurva Rai
//KU hackathon Apr. 21-22, 2018

var canvas = document.getElementById("fracCanvas");
var context = canvas.getContext("2d");

//pixel dimension constants
const height = document.getElementById("fracCanvas").height;
const width = document.getElementById("fracCanvas").width;

//complex plane intervals
var realStart = -2;
var realEnd = 2;
var imaginaryStart =-1.12;
var imaginaryEnd = 1.12;

// adds an event listener to a checkbox for later faking mouse clicks
document.getElementById("flowBox").addEventListener("click", fakeClick);

//Number of function iterations for each complex coordinated
//1000 is the sweet spot in terms of quality of the visuals per ammount of render time
var iterations = 1000;

//zoom value is the inverse of the input zoom multiplier
var zoomInput=(1/document.getElementById("zoomInput").value);

var scale; //scale will become the interval length. As the fractal zooms in, the scale gets smaller and smaller.

canvas.addEventListener("mousedown", zoom, false); //mousedown listener is used for zooming in


var pixelVals = context.getImageData(0, 0, width, height);
//
// pixelVals becomes an array of size 4, 
// containing red, green, blue, and alpha values for every pixel on the canvas
//

//function called on mousedown event on the canvas
function zoom(evt)
{
  
    zoomInput=(1/document.getElementById("zoomInput").value);
    
    console.log(evt.x + " " + evt.y);
    
    //Using the mousedown x and y pixel locations, 
    //the new center of the screen in complex coordinates is put into xcenter and ycenter
    var ycenter = -1*(evt.y/height)*(imaginaryEnd-imaginaryStart) + imaginaryEnd;
    console.log("y" + ycenter);
    
    var xcenter = realStart + (evt.x/width)*(realEnd-realStart);
    console.log("x" + xcenter);
    
    
    //the new interval endpoints are calculated based on the new centers and the zoom multiplier
    var tempEnd = realStart;
    realStart = xcenter - (zoomInput *( realEnd-realStart))/2;
    realEnd = xcenter - (zoomInput*( tempEnd-realEnd))/2;
    
    tempEnd = imaginaryStart;
    imaginaryStart = ycenter - (zoomInput*( imaginaryEnd-imaginaryStart))/2;
    imaginaryEnd = ycenter - (zoomInput *( tempEnd-imaginaryEnd))/2;
    
    //calculates the interval length
    scale=Math.abs(realEnd)-Math.abs(realStart);
    console.log(Math.abs(scale));

    //fractal redrawn
    drawFractal();   
}

//for continuous zoom
//creates a fake mouse event and then fakes continous clicks using a check box
function fakeClick()
{
    fakeMouse = new Event("click");
    fakeMouse.x = width/2.18;
    fakeMouse.y = height/2.18;
    
    document.getElementById("zoomInput").value = 3;
    
    setInterval(zoom(fakeMouse), 6000);
    
}

//refreshes canvas with the new pixel values from the last loop
function updateCanvas()
{
    context.putImageData(pixelVals, 0, 0);
}

function custom(comp1, comp2)
{
    return new Complex(comp)
}

function flip(comp1)
{
    return new Complex(comp1.imaginary, comp1.real);
}

function iterate(comp)
{
    var constant = comp.add(comp);
  
  for (loo = 1; loo <= iterations; loo++)
  {
     
      comp = comp.multiply(comp);
       comp = comp.add(constant);
      //comp = flip(comp);
      //comp = comp.multiply(comp);
      
    if ( comp.mag() > 4 )
    {
      return loo;
    }
  }
  return 0;
    
}


function drawFractal()
{
    
    var real = realStart;
    var imaginary = imaginaryStart;
    
    for (horPixel = 0;  horPixel< width; horPixel++)
    {  
        for (vertPixel =0; vertPixel < height; vertPixel++)
        {
            // For every pixel in the canvas, the correseponding complex coordinate is put into an iterative function
            // After many iterations of putting the complex number through recurrence relation functions, a value is obtained.
            // That value is xsubn.
            var xsubn = iterate(new Complex(real, imaginary));
            
            
            //different color functions are called based on the value of xsubn. 
            //values of '0' are black
            
            if ( xsubn == 0 )
            {
                drawPixel(horPixel, vertPixel, 0, 0, 0, 255);
            }
            else if (xsubn > 30)
            {
                xsubn = Math.log(xsubn)/Math.log(2);
                drawPixel(horPixel, vertPixel, redColor(xsubn), greenColor(xsubn), blueColor(xsubn), 255);
            }
            
            else if (xsubn <= 30)
            {
                xsubn = Math.log(xsubn)/Math.log(2);
                
                drawPixel(horPixel, vertPixel, redColor(xsubn), greenColor(xsubn), blueColor(xsubn), 255);
            }
            
            imaginary = imaginaryEnd - ( (imaginaryEnd -imaginaryStart) / height) * vertPixel;
        }
        real = ( (realEnd -realStart) / width) * horPixel +realStart;
    }
    updateCanvas();
}



//COLOR FUNCTIONS

//Each color function has its own, unique way of taking the xsubn input and converting to a red, green, or blue, pixel value between 0 and 255

//red is a little different and has a recurrence relation

function redColor(reps)
{
    return Math.abs(Math.cos(Math.log(reps * Math.PI))) * 256;
}

function greenColor(reps)
{
    return Math.abs(Math.sin(reps * Math.PI * 2)) * 256;
}

function blueColor(reps)
{

    return Math.abs(Math.cos(reps * Math.PI/2)) * 256;
}

//draw pixel sets 1 pixels color, given its location and its associated rgba values
// pixelsvals is an array of all rgba values for every pixel. 

function drawPixel(horPixel,vertPixel,r,g,b,a)
{
    
    //var i relocates the index of the array to the start of each pixels rgba values
    var i = (horPixel + vertPixel * width)*4;

    pixelVals.data[i] = r;
    pixelVals.data[i + 1] = g;
    pixelVals.data[i + 2] = b;
    pixelVals.data[i + 3] = a;
}        

drawFractal();