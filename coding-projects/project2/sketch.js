
let xspacing = 11; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 85.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

//Scene 1 -----------------------------------------------
let waveCount = 10;
let waves1 = [];
let waves2 = [];
let waves3 = [];
let waves4 = [];
let waveAmpSpeed = 3;
let ampRamp = 0.01;

let fishCount = 20; 
let fishes = []; 
let fishSpinSpeed = 0; //how fast the fish spin
let fishSpeedRamp = 0.000005; //how fast the fish spin even faster

let waterParticlesCount = 100;
let waterParticles = [];
let waterParticleSpeed = 5; //how fast the particles move

const Y_AXIS = 1; //for gradient
let c1,c2,c3,c4,c5,c6;//gradient colors
let ty = 0; //moving gradient scene

let recMode = false; //recording boolean
let can;

let sceneScale = 1;
let sceneScaleSpeed = 0.01;
let sceneAlpha = 0;
//--------------------------------------------------------
//scene 2

let scene2Translate = 0; //moving gradient scene
let imageAlpha = 0;

let bubbles = [];
let bubbles2 = [];
let bubbleCount = 15;

let fishCount2 = 20; 
let fishes2 = []; 

function preload(){
  imgScene2 = loadImage('underwater.png');
}

function setup() {
  can = createCanvas(1066, 600);
  frameRate(30);
  
  //scene 1 setup ----------------------------------------------
  w = width * 2 + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
 

  for (let i = 0; i < waveCount; i++){
    theta = random(0,1);
    waves1[i] = new rcSineWave(xspacing,w,theta,amplitude,period,dx,yvalues,color(32,random(50,255),255));
    waves2[i] = new rcSineWave(xspacing,w,theta,amplitude,period,dx,yvalues,color(32,random(50,255),255));
    waves3[i] = new rcSineWave(xspacing,w,theta,amplitude,period,dx,yvalues,color(32,random(50,255),255));
    waves4[i] = new rcSineWave(xspacing,w,theta,amplitude,period,dx,yvalues,color(32,random(50,255),255));
  
  }

  for(let i = 0; i < fishCount; i++){
    fishes[i] = new rcParticle(random(0.3,0.6), color(random(0,255),random(0,255),random(0,255)));
  }

  for(let i = 0; i < waterParticlesCount; i++){
    waterParticles[i] = new rcParticle(random(0.3,0.7),color(173, random(180,234), 255));
  }

  c1 = color(171, 210, 218);//gradient colors for scene1
  c2 = color(25, 19, 115);
 
  //-------------------------------------------------------------
  //scene 2 setup

  c3 = color(55, 89, 105);//gradient colors for scene2
  c4 = color(0, 1, 16);
  
  for(let i = 0; i < fishCount2; i++){
    fishes2[i] = new rcParticle(random(0.3,0.6), color(random(0,255),random(0,255),random(0,255)));
  }

  for(let i = 0; i < bubbleCount; i++){
    bubbles[i] = new rcParticle(random(0.3,0.7),color(173, random(180,234), 255));
    bubbles2[i] = new rcParticle(random(0.3,0.7),color(173, random(180,234), 255));

    bubbles[i].setY(random(1,130));
    bubbles[i].setSpeed(random(-1,-3));

    bubbles2[i].setY(random(1,300));
    bubbles2[i].setSpeed(random(-1,-3));
  }


  //noLoop();
}

function draw() {
  background(0);

   //  start as true until 1100
    if (frameCount < 1100) {
  
     //scene zooms in
    if(frameCount > 900){
      zoomSceneTransition();
      }
      
      push();
      
      //scene moves down at 300 frames
      if(frameCount > 300){
        translate(0,ty);
        if(ty > -600){
          ty -= 2;
        }
       
      }
      
      setGradient(0,0,width,height,c1,c2,Y_AXIS);//x,y,w,h,c1,c2,axis   
      setGradient(0,height,width,height,c2,c4,Y_AXIS);//x,y,w,h,c1,c2,axis
      
        customWave(-200,w+44,-HALF_PI,waves1,0.34,-40);
        customWave(50,w+44,-HALF_PI,waves2,0.34,-40);
        customWave(400,w+44,-HALF_PI,waves3,0.34,-40);
        customWave(650,w+44,-HALF_PI,waves4,0.34,-40);
        
     pop();
     
      //fish
    for(let i = 0; i < fishes.length; i++){
      fishes[i].moveParticle();
      fishes[i].rcDisplayFish();
      fishes[i].switchScale();

      //fish spin at frame 600
      if(frameCount > 600){
        fishes[i].rcFishWhirlPool(fishSpinSpeed);
        
      }
      if(fishSpinSpeed < 0.25){
        fishSpinSpeed += fishSpeedRamp
        if(fishSpeedRamp < 0.00005){
          fishSpeedRamp += 0.00001;
        }
      }
    
   
    }

    //water particles
    for(let i = 0; i < waterParticles.length; i++){
      waterParticles[i].moveParticle();
      waterParticles[i].displayParticle();

      //water particle speed increase at 600
      if(frameCount > 600 && frameCount < 602){
        waterParticles[i].changeSpeed(waterParticleSpeed);
      }
    }

    //scene fades to black
    if(frameCount > 1000){
      sceneFade();
      
    }







  
    //scene of the underwater floor *******
    } else {
      //resetting sceneAlpha
      if(frameCount >1302 && frameCount < 1305){
        sceneAlpha = 0;
      }
      
      if(frameCount > 1300){
        push();

        translate(0,scene2Translate);

        setGradient(0,height,width,height,c4,c2,Y_AXIS);//x,y,w,h,c1,c2,axis
        //scene moves up at 300 frames
        
        if(scene2Translate > -600){
          scene2Translate -= 3;
          } 
        pop();
        
        
       
      }

      if(frameCount > 1400){
        tint(255,imageAlpha);
        if(imageAlpha < 255){
          imageAlpha += 0.5;
        }
        image(imgScene2,0,height-330,1100,370);

        for(let i = 0; i < fishes2.length; i++){
          fishes2[i].moveParticle();
          fishes2[i].rcDisplayFish(imageAlpha);
          fishes2[i].switchScale();
          
        }
        
        
        for(let i = 0; i < bubbles.length; i++){
          //bubbles[i].moveBubbles(800,700);
          //bubbles[i].rcDisplayBubbles(imageAlpha);
          bubbles[i].rcBubbles(270,140,imageAlpha);
          bubbles2[i].rcBubbles(495,190,imageAlpha);
          
        }
      }

      //scene fades to black
    if(frameCount > 1900){
      sceneFade();
      
      }
    }

    //recordit();

   
  }

  //function takes x coord, y coord, rotation
  //array function of sine objects, and renderwave scale change
  //if rwScale is negative, outputs array of that constant size
  //second parameter is intial shape size
  function customWave(x,y,r,arr,rwScale,rwInitial){
    for(i = 0; i < arr.length; i++){
      push();
      arr[i].setPosition(x,y);
      rotate(r);

      if(frameCount > 550){
        arr[i].rcWhirlPool(waveAmpSpeed,4000);
        if(ampRamp < 2){
          waveAmpSpeed += ampRamp;
        }
      }

      arr[i].calcWave();
      
      arr[i].rcRenderWave(rwScale, rwInitial);

     
      pop();
    }
   
    
  }
 
  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

  function keyPressed() {

    if (keyIsPressed === true) {
        let k = key;
        console.log("k is " + k);

        if (k == 's' || k == 'S') {
            console.log("Stopped Recording");
            recMode = false;
            noLoop();
        }

        if (k == 'r') {
            console.log("Start Recording");
            recMode = true;
            loop();
        }
    }
}

function recordit() {  // new version
    if (recMode == true && frameCount < 2000) {
        let ext = nf(frameCount, 4);
        saveCanvas(can, 'frame-' + ext, 'jpg');
        console.log("rec " + ext);
    }
}

function zoomSceneTransition(){
    
    //push();
    scale(sceneScale);
    if(sceneScale < 10){
      sceneScale += sceneScaleSpeed;
      if(sceneScaleSpeed < 1){
        sceneScaleSpeed += 0.0002;
      }
      
    }
    //pop();
  }

  function sceneFade(){
    fill(0,sceneAlpha);
    rect(0,0,width,height);
    if(sceneAlpha < 255){
      sceneAlpha += 3;
    }
  }





