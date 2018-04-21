function setup(){
  createCanvas(710, 400, WEBGL);
}

function draw(){
  background(255);

  for(var j = 0; j < 100; j++){
    push();
    for(var i = 0; i < 15; i++){
      translate(cos(frameCount *.001 + j) * 5, tan(frameCount * .01 + j) * 10, i * 1);
      
      push();
      box(80); 
      pop();
    }
    pop();
  }
}