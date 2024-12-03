let color;
let brushSizeX;
let brushSizeY;
let canvas;
let brushType;
let strokeActive;
let alphaColor;
let strokeWeightValue;


function setup() {
  createCanvas(1000, 700);
  background(255, 240, 142);
  noStroke();

  //white canvas
  fill(255,255,255);
  rect(60,100,900,500);

  //test Board
  rect(300,620,300,70);

 color = "white";
 brushType = "circleBrush";
 strokeActive = false;
 brushSizeX = 5;
 brushSizeY= 5;
 alphaColor = 255;
 strokeWeightValue = 2;
}

function draw() {


strokeWeight(2);
stroke(0);
//DRAWING BOX DRAW SETTINGS ~~~~~

//color selection boxes***
//white
fill(255,255,255);
rect(60,10,20,20);
//red
fill(255,0,0);
rect(90,10,20,20);
//orange
fill(255, 191, 0);
rect(120,10,20,20);
//yellow
fill(252, 255, 0);
rect(150,10,20,20);
//green
fill(27, 255, 0);
rect(180,10,20,20);
//blue
fill(0, 100, 255);
rect(210,10,20,20);
//purple
fill(211, 0, 255);
rect(240,10,20,20);
//pink
fill(253, 120, 222);
rect(270,10,20,20);
//no Color
noFill();
rect(300,10,20,20);

//brush selection box***
fill(255,255,255);
textSize(20);
text("Brush Type:",450,30);

//circle
fill(255,255,255);
rect(570,10,20,20);
noFill();
circle(580,20,10,10);

//square
fill(255,255,255);
rect(600,10,20,20);
noFill();
rect(605,15,10,10);

//dot circle
fill(255,255,255);
rect(630,10,20,20);
noFill();
ellipse(635,20,5,5);
ellipse(640,15,5,5);
ellipse(645,20,5,5);
ellipse(640,25,5,5);

//blockframe
fill(255,255,255);
rect(660,10,20,20);
noFill();
line(663,16,675,16);
line(663,22,675,22);
line(667,14,667,26);
line(672,14,672,26);

//hour glass
fill(255,255,255);
rect(690,10,20,20);
noFill();
triangle(695,15,700,15,699,20);
triangle(700,15,705,15,701,20);
triangle(695,25,700,25,699,20);
triangle(705,25,700,25,701,20);


//stroke selection box***
fill(255,255,255);
text("Stroke:",720,30);

if(strokeActive == true){
  fill(255,255,255);
  rect(790,10,20,20);
  noFill();
  line(795,15,805,15);

  fill(252, 236, 119);
  rect(820,10,20,20);
}
else{
  fill(252, 236, 119);
  rect(790,10,20,20);
  noFill();
  line(795,15,805,15);

  fill(255,255,255);
rect(820,10,20,20);

}

//adding strokeweight
fill(255,255,255);
text("Strokeweight:", 665,67);
fill(255,255,255);
rect(790,50,20,20);
noFill();
line(800,55,800,65);
line(795,60,805,60);

//subtracking strokeweight
fill(255,255,255);
rect(820,50,20,20);
noFill();
line(825,60,835,60);


//brushSize settings***
fill(255,255,255);
text("Brush Size",50,630);
fill(255,255,255);
rect(70,640,20,20);
noFill();
line(80,645,80,655);
line(75,650,85,650);

fill(255,255,255);
rect(110,640,20,20);
noFill();
line(115,650,125,650);

//Alphabrush settings***
fill(255,255,255);
text("Alpha",175,630);

fill(255,255,255);
rect(170,640,20,20);
noFill();
line(180,645,180,655);
line(175,650,185,650);

fill(255,255,255);
rect(210,640,20,20);
noFill();
line(215,650,225,650);

//Erase Canvas and Board Button ***

fill(255,255,255);
text("Reset Canvas",840,630);
rect(900,640,20,20);
line(905,645,915,655);
line(915,645,905,655);

fill(255,255,255);
text("Erase Testboard",670,630);
rect(730,640,20,20);
line(735,645,745,655);
line(745,645,735,655);


//check for cursor in canvas area
if(canvasChecker() == true || testBoardChecker() == true){
  drawCanvas();
}
else{
  outCanvas();
}

//function to check cursor location
function canvasChecker(){
  if(mouseX > 60 && mouseX < 960){
    if(mouseY > 100 && mouseY < 600){
      return true;
    }
    else{
      return false;
    }
  }
}

//function to check Testboard
function testBoardChecker(){
  if(mouseX>300 && mouseX<600){
    if(mouseY>620 && mouseY<690){
      return true;
    }
    else{
      return false;
    }
  }
}


//any actions outside of the canvas
 function outCanvas(){
    

//color detect selections***
    if(mouseIsPressed === true){
      //white selection
     if(mouseX > 60 && mouseX < 80){
        if(mouseY > 10 && mouseY < 30){
          color = "white";
          print('Selected White');
        }
      }

      //red selection
     if(mouseX > 90 && mouseX < 110){
        if(mouseY > 10 && mouseY < 30){
          color = "red";
          print('Selected Red');
         }
       }

       //orange selection
       if(mouseX > 120 && mouseX < 140){
        if(mouseY > 10 && mouseY < 30){
          color = "orange";
          print('Selected Orange');
         }
       }

      //yellow selection
       if(mouseX > 150 && mouseX < 170){
        if(mouseY > 10 && mouseY < 30){
          color = "yellow";
          print('Selected Yellow');
         }
       }

       //green selection
       if(mouseX > 180 && mouseX < 200){
        if(mouseY > 10 && mouseY < 30){
          color = "green";
          print('Selected Green');
         }
       }

       //blue selection
       if(mouseX > 210 && mouseX < 230){
        if(mouseY > 10 && mouseY < 30){
          color = "blue";
          print('Selected Blue');
         }
       }

       //purple selection
       if(mouseX > 240 && mouseX < 260){
        if(mouseY > 10 && mouseY < 30){
          color = "purple";
          print('Selected Purple');
         }
       }

       //pink selection
       if(mouseX > 270 && mouseX < 280){
        if(mouseY > 10 && mouseY < 30){
          color = "pink";
          print('Selected Pink');
         }
       }

       //No Color selection
       if(mouseX > 300 && mouseX < 320){
        if(mouseY > 10 && mouseY < 30){
          color = "noFill";
          print('Selected No Fill Color');
         }
       }

  //Brush Type Selection ***

       //circle
       if(mouseX > 570 && mouseX < 590){
        if(mouseY > 10 && mouseY < 30){
          brushType = "circleBrush";
          print('Selected Circle Brush');
         }
       }

       //square
       if(mouseX > 600 && mouseX < 620){
        if(mouseY > 10 && mouseY < 30){
          brushType = "squareBrush";
          print('Selected Square Brush');
         }
       }

       //dot brush
       if(mouseX > 630 && mouseX < 650){
        if(mouseY > 10 && mouseY < 30){
          brushType = "rcDotCircleBrush";
          print('Selected RC Dot Brush');
         }
       }

       //block frame brush
       if(mouseX > 660 && mouseX < 680){
        if(mouseY > 10 && mouseY < 30){
          brushType = "rcBlockFrameBrush";
          print('Selected RC Block Frame Brush');
         }
       }

       //rcHourGlass
       if(mouseX > 690 && mouseX < 710){
        if(mouseY > 10 && mouseY < 30){
          brushType = "rcHourGlassBrush";
          print('Selected RC Hour Glass Brush');
         }
       }

  //Stroke Activation and weight ***
      if(mouseX > 790 && mouseX < 810){
        if(mouseY > 10 && mouseY < 30){
          if(strokeActive == false){
            strokeActive = true;
            print('Stroke is Active');
          }
        }
      }

      if(mouseX > 820 && mouseX < 840){
        if(mouseY > 10 && mouseY < 30){
          if(strokeActive == true){
            strokeActive = false;
            print('Stroke is Deactive');
          }
         }
       }

       if(mouseX > 790 && mouseX < 810){
        if(mouseY > 50 && mouseY < 70){
          if(strokeWeightValue < 50){
            strokeWeightValue = strokeWeightValue + 0.2;
            print(strokeWeightValue.toFixed(1));
          }
          else{
            print('Strokewieght cannot go over 50...')
          }
        }
      }

      if(mouseX > 820 && mouseX < 840){
        if(mouseY > 50 && mouseY < 70){
          if(strokeWeightValue > 0){
            strokeWeightValue = strokeWeightValue - 0.2;
            print(strokeWeightValue.toFixed(1));
          }
          else{
            print('Strokewieght cannot be negative')
          }
         }
       }

  //Brush Size ***
       //add
       if(mouseX > 70 && mouseX < 90){
        if(mouseY > 640 && mouseY < 660){
          if(brushSizeX < 150){
            brushSizeX = brushSizeX + 0.2;
            brushSizeY = brushSizeX + 0.2;
            print(brushSizeX.toFixed(1) + " " + brushSizeY.toFixed(1));
          }
          else{
            print("brush cannot be any bigger");
          }
        
          }
        }

       //subtract
       if(mouseX > 110 && mouseX < 130){
        if(mouseY > 640 && mouseY < 660){
          if(brushSizeX > 0){
            brushSizeX = brushSizeX - 0.2;
            brushSizeY = brushSizeY - 0.2;
            print(brushSizeX.toFixed(1) + " " + brushSizeY.toFixed(1));
           }
           else{
            print("Brush cannot be negative");
           }
          }
        }

  //Alpha Brush ***
        if(mouseX > 170 && mouseX < 190){
        if(mouseY > 640 && mouseY < 660){
          if(alphaColor < 255){
            alphaColor = alphaColor + 0.4;
            alphaColor = alphaColor + 0.4;
             print(alphaColor.toFixed(1));
          }
          else{
            alphaColor = 255;
            print('Alpha color cannot go higher than 255');
          }
          
         
          }
        }

       //subtract
       if(mouseX > 210 && mouseX < 230){
        if(mouseY > 640 && mouseY < 660){
          if(alphaColor > 0){
            alphaColor = alphaColor - 0.4;
            print(alphaColor.toFixed(1));
            
           }
           else{
            alphaColor = 0;
            print("Alpha cannot be negative");
           }
          }
        }

  //Erase Canvas and Board ***
        if(mouseX > 900 && mouseX < 920){
          if(mouseY > 640 && mouseY < 660){
            noStroke();
            fill(255, 240, 142);
            rect(0,0,width,height);
            fill(255,255,255);
            rect(60,100,900,500);
            rect(300,620,300,70);
            print("Reset Canvas");
         }
      }

      if(mouseX > 730 && mouseX < 750){
        if(mouseY > 640 && mouseY < 660){
          noStroke();
          rect(300,620,300,70);
          print("Testboard erased");
       }
    }
    } 
  }


  //all functions within the canvas
  function drawCanvas(){
    

  //selecting color functionality***

    if(color == "red"){
      fill(255,0,0,alphaColor);
     }
   else if(color == "white"){
     fill(255,255,255,alphaColor);
     }
   else if(color == "orange"){
    fill(255, 191, 0,alphaColor);
     }
     else if(color == "yellow"){
      fill(252, 255, 0,alphaColor);
     }
     else if(color == "green"){
      fill(27, 255, 0,alphaColor);
     }
     else if(color == "blue"){
      fill(0, 100, 255,alphaColor);
     }
     else if(color == "purple"){
      fill(211, 0, 255,alphaColor);
     }
     else if(color == "pink"){
      fill(253, 120, 222,alphaColor);
     }
     else if(color == "noFill"){
      noFill();
     }
     else{

     }

    //activating stroke***
     if(strokeActive == true){
      stroke(0);
      strokeWeight(strokeWeightValue);
     }
     else{
      noStroke();
     }

    //brush type***
    if(mouseIsPressed === true){

    if(brushType == "circleBrush"){
      ellipse(mouseX,mouseY,brushSizeX,brushSizeY);
      }

     if(brushType == "squareBrush"){
      rectMode(CENTER);
      rect(mouseX,mouseY,brushSizeX,brushSizeY);
      rectMode(CORNER);
     }

     if(brushType == "rcDotCircleBrush"){
      rcDotCircleBrush(brushSizeX,brushSizeY);
     }

     if(brushType == "rcBlockFrameBrush"){
      rcBlockFrameBrush(brushSizeX,brushSizeY);
     }

     if(brushType == "rcHourGlassBrush"){
      rcHourGlassBrush(brushSizeX,brushSizeY);
     }

     
    }
  }
  
//Custom BRUSHES
let cx,cy;
function rcDotCircleBrush(cx,cy){
  ellipse(mouseX+10,mouseY,cx,cy);
  ellipse(mouseX+5,mouseY+5,cx,cy);
  ellipse(mouseX,mouseY+10,cx,cy);
  ellipse(mouseX-5,mouseY+5,cx,cy);
  ellipse(mouseX-10,mouseY,cx,cy);
  ellipse(mouseX-5,mouseY-5,cx,cy);
  ellipse(mouseX,mouseY-10,cx,cy);
  ellipse(mouseX+5,mouseY-5,cx,cy);
}

function rcBlockFrameBrush(cx,cy){
  beginShape();
  vertex(mouseX-4-cx,mouseY-10-cy);
  vertex(mouseX-10-cx,mouseY-5-cy);
  vertex(mouseX-4-cx,mouseY);
  vertex(mouseX-10-cx,mouseY+5+cy);
  vertex(mouseX-4-cx,mouseY+10+cy);
  endShape();

  beginShape();
  vertex(mouseX+4+cx,mouseY-10-cy);
  vertex(mouseX+10+cx,mouseY-5-cy);
  vertex(mouseX+4+cx,mouseY);
  vertex(mouseX+10+cx,mouseY+5+cy);
  vertex(mouseX+4+cx,mouseY+10+cy);
  endShape();

  beginShape();
  vertex(mouseX-10-cx,mouseY-4-cy);
  vertex(mouseX-5-cx,mouseY-10-cy);
  vertex(mouseX,mouseY-4-cy);
  vertex(mouseX+5+cx,mouseY-10-cy);
  vertex(mouseX+10+cx,mouseY-4-cy);
  endShape();

  beginShape();
  vertex(mouseX-10-cx,mouseY+4+cy);
  vertex(mouseX-5-cx,mouseY+10+cy);
  vertex(mouseX,mouseY+4+cy);
  vertex(mouseX+5+cx,mouseY+10+cy);
  vertex(mouseX+10+cx,mouseY+4+cy);
  endShape();
}

function rcHourGlassBrush(cx,cy){

  triangle(mouseX-10-cx,mouseY-10-cy,mouseX,mouseY-10-cy,mouseX,mouseY);
  triangle(mouseX+10+cx,mouseY-10-cy,mouseX,mouseY-10-cy,mouseX,mouseY);
  triangle(mouseX-10-cx,mouseY+10+cy,mouseX,mouseY+10+cy,mouseX,mouseY);
  triangle(mouseX+10+cx,mouseY+10+cy,mouseX,mouseY+10+cy,mouseX,mouseY);


/*
  beginShape();
//right side top down
//vertex(mouseX,mouseY-15-cy);
vertex(mouseX+15+cx,mouseY-7-cy);
vertex(mouseX+4+cx,mouseY-3-(cy*0.5));
vertex(mouseX+15+cx,mouseY);
vertex(mouseX+4+cx,mouseY+3+(cy*0.5));
vertex(mouseX+15+cx,mouseY+7+cy);
//vertex(mouseX,mouseY+15+cy);
//left side bottom up
vertex(mouseX-15-cx,mouseY+7+cy);
vertex(mouseX-4-cx,mouseY+3+(cy*0.5));
vertex(mouseX-15-cx,mouseY);
vertex(mouseX-4-cx,mouseY-3-(cy*0.5));
vertex(mouseX-15-cx,mouseY-7-cy);
//vertex(mouseX,mouseY-15-cy);
endShape();
*/
}







//COORDINATE READER for development purposes
function coordinates(){
  fill(255,0,0);
  noStroke();
  text("("+mouseX+","+mouseY+")", mouseX, mouseY);
  }
}

