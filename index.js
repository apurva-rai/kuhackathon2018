

const height = 1080;
const width = 1920;

var realStart = -2;
var realEnd = .47;
var imaginaryStart = -1.12;
var imaginaryEnd = 1.12;

var canvas=document.getElementById("fracCanvas");
var context=canvas.getContext("2d");

var rgba = context.getImageData(0, 0, width, height);
function setup(){
}


function updateCanvas() {
    context.putImageData(rgba, 0, 0);
}

function iterate(comp)
{
    var constant = comp;
  
  for (loo = 1; loo <= 1000; loo++)
  {
     
      comp = comp.multiply(comp);
       comp = constant.add(comp);
      
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
     return (reps*15)%256;
  if(reps == 2)
	return (reps*5)%256;
  if(reps == 3) 
	return (reps+10)%256;
  else
	return (reps+50)%256;
}

function greenColor(reps)
{
    if(reps == 1)
     return (reps + 150)%256;
  if(reps == 2)
	return (reps*150)%256;
  if(reps == 3) 
	return (Math.random() * (reps+100) )%256;
  else
	return 0;
}

function blueColor(reps)
{
    if(reps == 1)
     return (reps *220)%256;
  if(reps == 2)
	return (reps+50)%256;
  if(reps == 3) 
	return (reps*100)%256;
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