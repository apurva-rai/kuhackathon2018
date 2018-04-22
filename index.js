//Max Goad and Apurva Rai
//KU hackathon Apr. 21-22, 2018

var canvas = document.getElementById("fracCanvas");
var context = canvas.getContext("2d");

//pixel dimension constants
const height = document.getElementById("fracCanvas").height;
const width = document.getElementById("fracCanvas").width;

var realStart = -2;
var realEnd = 2;
var iStart =-1.12;
var iEnd = 1.12;

//Number of function iterations for each complex coordinated
//1000 is the sweet spot in terms of quality of the visuals per ammount of render time
var iterations = 1000;

document.getElementById("redSlider").addEventListener("mouseup", drawFractal);
document.getElementById("greenSlider").addEventListener("mouseup", drawFractal);
document.getElementById("blueSlider").addEventListener("mouseup", drawFractal);

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
    var ycenter = -1*(evt.y/height)*(iEnd-iStart) + iEnd;
    console.log("y" + ycenter);
    
    var xcenter = realStart + (evt.x/width)*(realEnd-realStart);
    console.log("x" + xcenter);
    
    
    //the new interval endpoints are calculated based on the new centers and the zoom multiplier
    var tempEnd = realStart;
    realStart = xcenter - (zoomInput *( realEnd-realStart))/2;
    realEnd = xcenter - (zoomInput*( tempEnd-realEnd))/2;
    
    tempEnd = iStart;
    iStart = ycenter - (zoomInput*( iEnd-iStart))/2;
    iEnd = ycenter - (zoomInput *( tempEnd-iEnd))/2;
    
    //calculates the interval length
    scale=Math.abs(realEnd)-Math.abs(realStart);

    //fractal redrawn
    drawFractal();  

}


//refreshes canvas with the new pixel values from the last loop
function updateCanvas()
{
    context.putImageData(pixelVals, 0, 0);
    return true;
}

function custom(comp1, comp2)
{
    return comp1;
}


//the iterative function that implements the math involved in the patterns of the fractal
//The most basic mandelbrot fractal is xsubn^2 = xsubn-1 + c
function iterate(comp)
{
    var constant = comp.add(comp);
  
    for (loo = 1; loo <= iterations; loo++)
    {
        
        comp = comp.multiply(comp);
        comp = comp.add(constant);
        if ( comp.mag() > 10 )
        {
            return loo;
        } 
    }
    return 0;    
}


function drawFractal()
{
    
    var real = realStart;
    var imaginary = iStart;
    
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
            
            imaginary = iEnd - ((iEnd -iStart) / height) * vertPixel;
        }
        real = ((realEnd -realStart) / width) * horPixel +realStart;
    }
    updateCanvas();
}



//COLOR FUNCTIONS

//Each color function has its own, unique way of taking the xsubn input and converting to a red, green, or blue, pixel value between 0 and 255

//red is a little different and has a recurrence relation

function redColor(reps)
{
    var redSlider = 100/document.getElementById("redSlider").value;
   
    return Math.abs(Math.cos( redSlider* Math.log(reps * Math.PI))) * 256;
}

function greenColor(reps)
{
     var greenSlider = 100/document.getElementById("greenSlider").value;
    return Math.abs(Math.sin(greenSlider*reps * Math.PI * 2)) * 256;
}

function blueColor(reps)
{
    var blueSlider = 100/document.getElementById("blueSlider").value;
    return Math.abs(Math.cos(blueSlider*reps * Math.PI/2)) * 256;
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
function refreshR()
{
    realStart = -2;
    realEnd = 2;
    iStart =-1.12;
    iEnd = 1.12;
    drawFractal();
}

drawFractal();
