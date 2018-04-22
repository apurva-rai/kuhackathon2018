

const height = document.getElementById("fracCanvas").height;
const width = document.getElementById("fracCanvas").width;

var realStart = -2;
var realEnd = 2;
var imaginaryStart =-1.12;
var imaginaryEnd = 1.12;
var zoomInput=(1/document.getElementById("zoomInput").value);
var scale=0;

var canvas = document.getElementById("fracCanvas");
var context = canvas.getContext("2d");

canvas.addEventListener("mousedown", zoom, false);


var rgba = context.getImageData(0, 0, width, height);


function zoom(evt)
{
  
    zoomInput=(1/document.getElementById("zoomInput").value);
    
    console.log(zoomInput);
    var ycenter = -1*(evt.y/height)*(imaginaryEnd-imaginaryStart) + imaginaryEnd;
    console.log("y" + ycenter);
    
    var xcenter = realStart + (evt.x/width)*(realEnd-realStart);
    console.log("x" + xcenter);
    
    var tempEnd = realStart;
    realStart = xcenter - (zoomInput *( realEnd-realStart))/2;
    realEnd = xcenter - (zoomInput*( tempEnd-realEnd))/2;
    
     tempEnd = imaginaryStart;
    imaginaryStart = ycenter - (zoomInput*( imaginaryEnd-imaginaryStart))/2;
    imaginaryEnd = ycenter - (zoomInput *( tempEnd-imaginaryEnd))/2;
    
    scale=Math.abs(realEnd)-Math.abs(realStart);
    console.log(Math.abs(scale));
    

    /*
    var real1 = ( (realEnd - realStart) / width) * evt.x/2 + realStart;
    var imaginary1 = imaginaryEnd - ( (imaginaryEnd - imaginaryStart) / height) * evt.y;

    var real2 = ( (realEnd - realStart) / width) * evt.x/2 + realEnd;
    var imaginary2 = imaginaryEnd - ( (imaginaryEnd - imaginaryStart) / height) * evt.y;

    realStart = real1;
    realEnd = real2;
    imaginaryStart = imaginary2;
    imaginaryEnd = imaginary1;
    */
  

  drawFractal();
    
   
}

function updateCanvas() {
    context.putImageData(rgba, 0, 0);
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
  
  for (loo = 1; loo <= 1000; loo++)
  {
     //mandelbrot
      comp = comp.multiply(comp);
       comp = comp.add(constant);
      //comp = flip(comp);
      //comp = comp.multiply(comp);
      
      //buddahbrot
      
      
      
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
    
    for (xPix = 0;  xPix< width; xPix++)
    {
    updateCanvas();
    for (yPix =0; yPix < height; yPix++)
    {
      var reps = iterate(new Complex(real, imaginary) );
      if ( reps == 0 )
      {
          //ellipse(xPix,yPix,1,1);
        drawPixel(xPix, yPix, 0, 0, 0, 255);
      }
      else
      {
        drawPixel(xPix, yPix, redColor(reps), greenColor(reps), blueColor(reps), 255);
     }
      imaginary = imaginaryEnd - ( (imaginaryEnd -imaginaryStart) / height) * yPix;
    }
    real = ( (realEnd -realStart) / width) * xPix +realStart;
  }
    
}

function redColor(reps)
{
    if(reps == 1)
     return (reps*15)%256 + 35*Math.random();
  if(reps == 2)
	return (reps*5)%256 + 35*Math.random();
  if(reps == 3) 
	return 15*Math.random();
  else
	return (reps+50)%256 + 35*Math.random();
}

function greenColor(reps)
{
    if(reps == 1)
     return (reps + 150)%256;
  if(reps == 2)
	return (reps*150)%256;
  if(reps == 3) 
	return 0;
  else
	return 0;
}

function blueColor(reps)
{
    if(reps == 1)
     return (reps+50)%256;
  if(reps == 2)
	return (reps+50)%256;
  if(reps == 3) 
	return 0;
  else
	return 0;
}

function drawPixel(xPix, yPix, r,g,b, n)
{
    //ellipse(xPix,yPix, 1, 1);
    //fill(r,g,b);
   
    
    var index = (xPix + yPix * width)*4;

    rgba.data[index + 0] = r;
    rgba.data[index + 1] = g;
    rgba.data[index + 2] = b;
    rgba.data[index + 3] = n;
}

function toCart(complex)
{
    
    ellipse(complex.real/2 * width, complex.imaginary/1.12*height, 1, 1);
}
          
function mousePressed() {
  remove(); // remove whole sketch on mouse press
}

drawFractal();