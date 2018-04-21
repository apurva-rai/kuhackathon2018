

var height = 400;
var width = 710;

function setup(){
  createCanvas(710, 400, WEBGL);
    pixelDensity(1);
   
    
    
     
}

function iterate(comp)
{
    out = new Complex(0,0);
    var rep = 0;
    while(out.real < 100 && rep < 100)
    {
        out = out.multiply(out);
        out = out.add(comp);
        out = out.add(comp);
        rep++;
    }
    return out;
    
}

function draw(){
    background(255);
    push();
    
    //rotate(frameCount%30);
    
    for( var real = -2; real< 2; real+=.01)
    {
        for(var imag = -1.12; imag< 1.12; imag+=.01)
        {
            c = iterate(new Complex(real, imag));
            if(c.real < 100)
            {
                    toCart(c);
            }
            
            
        }
    }
    
    
    pop();
}

function toCart(complex)
{
    
    ellipse(complex.real/2 * width, complex.imaginary/2*height, 1, 1);
}
          
function mousePressed() {
  remove(); // remove whole sketch on mouse press
}