

var height = 400;
var width = 710;

function setup(){
  createCanvas(710, 400, WEBGL);
    pixelDensity(3);
   
    
    
     frameRate(1);
}

function iterate(comp)
{
    /*
    out = new Complex(0,0);
    var rep = 0;
    while( rep < 100)
    {
        out = out.multiply(out);
        out = out.add(comp);
        rep++;
    }
    return out;
    */
    var constant = comp;
  
  for (loop = 1; loop <= 1000; loop++)
  {
    comp = constant.add(comp);
   
comp = comp.multiply(comp);

 
    if ( comp.mag() > 4 )
    {
      return loop;
    }
  }
  return 0;
    
}
//frameRate = 1;
function draw(){
    frameRate(1);
    background(255);
    push();
    box((frameCount * 10+10) %120);
    //rotate(frameCount%30);
    /*
    for( var real = -2; real< 2; real+=.03)
    {
        for(var imag = -1.12; imag< 1.12; imag+=.03)
        {
            c = iterate(new Complex(real, imag));
                    toCart(c);
            
        }
    }
    */
    var real = -2;
  var imaginary = -1.12;
    for (xPix = 0;  xPix< width; xPix++)
  {
    //updateCanvas();
    for (yPix = 1; yPix < height; yPix++)
    {
      var reps = iterate( new Complex(real, imaginary) );
      if ( reps == 0 )
      {
          ellipse(xPix,yPix,1,1);
        //drawPixel(xPix, yPix, 0, 0, 0, 255);
      }
      else
      {
        drawPixel(xPix, yPix, redColor(reps), greenColor(reps), blueColor(reps), 255);
     }
      imaginary = 1.12 - ( (1.12 +1.12) / height) * yPix;
    }
    real = ( (2 +2) / width) * xPix -2;
  }

    
    pop();
}

function redColor(r)
{
    return 255;
}

function greenColor(r)
{
    return 255;
}

function blueColor(r)
{
    return 255;
}

function drawPixel(xPix, yPix, r,g,b, n)
{
    ellipse(xPix,yPix, 1, 1);
}

function toCart(complex)
{
    
    ellipse(complex.real/2 * width, complex.imaginary/1.12*height, 1, 1);
}
          
function mousePressed() {
  remove(); // remove whole sketch on mouse press
}