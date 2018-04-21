function setup(){
  createCanvas(710, 400, WEBGL);
    pixelDensity(1);
     
}

function draw(){
  background(255);
  ellipse(0,0,400,400,8);
  for(var j = 0; j < 10; j++){
    push();
    for(var i = 0; i < 5; i++){
      
      push();
      makebox(200); 
      pop();
    }
    pop();
  }
}

function makebox(rad)
{
    if(rad > 10)
    {
        for(rep = 0.0; rep <2*Math.PI; rep+=Math.PI/(frameCount % 24))
        {
            ellipse(rad*cos(rep),rad*sin(rep),rad, rad,8);
        }
        
        makebox(rad/2);
    }
    
}