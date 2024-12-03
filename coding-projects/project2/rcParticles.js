


class rcParticle {

      constructor(scale,color){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(0.1,5);
        this.xSpeed = random(-1,2);
        this.ySpeed = random(-1,1.5);
        this.color = color;
        this.scale1 = scale;
        this.scale2 = scale;
        this.spin = false;
        this.alpha = 255;
      }
    
      
      
    // drawing particle
      displayParticle(){
        noStroke();
        fill(this.color);
        circle(this.x,this.y,this.r);
      }
    
    // particle movement
      moveParticle() {
        if(this.x < 0 || this.x > width)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > height)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    

      //purpose for flipping the fish when it hits the border
      switchScale(){
        if(this.x > width){
          this.scale1*= -1;
        }
        if(this.x < 0){
          this.scale1*= -1;
        }
      }

     

      //drawing a fish
      rcDisplayFish(a){
       this.alpha = a;
      push();
      stroke(0);
      strokeWeight(1);
      translate(this.x,this.y);
      scale(this.scale1,this.scale2);
      //body
       fill(254, 235, 245,this.alpha);
       ellipse(-25,0,10,40);
       fill(222, 208, 238,this.alpha);
       ellipse(0,0,50,30);
  
       //eyes
       fill(0,this.alpha);
       ellipse(15,-4,7,7);
       fill(255,this.alpha);
       ellipse(16,-5,4,4);
  
        //fins
        stroke(0);
        strokeWeight(1);
       fill(254, 235, 245,this.alpha);
       curve(10,-70,-10,2,5,5,20,-50)
       curve(10,100,-10,-15,5,-15,20,50)
        pop();
      }

      rcFishWhirlPool(spinSpeed){
        //let spin = false;
          
          if(this.spin == false){
            this.scale1 -= spinSpeed;
            if(this.scale1 < -this.scale2){
              this.spin = true;
            }
            
          }
          else if(this.spin == true){
                  this.scale1 += spinSpeed;
            
             if(this.scale1 > this.scale2){
              this.spin = false;
            }
          }
        
        }

        //changing speed for water particles during whirlpool
      changeSpeed(speed){
        this.xSpeed += speed * random(1.1,1.5);
        this.ySpeed += speed * random(1.1,1.5);
       this.x += this.xSpeed * 1.1;
        this.y += this.ySpeed;

        
      }


      rcBubbles(emitX, emitY, a){
        
        push();
        this.x = emitX;
        this.xSpeed = emitX;
        this.y = this.y + this.ySpeed;

        if(this.y < 0 - emitY){
          this.y = emitY;
        }
       
        
        this.alpha = a;
       
        translate(emitX,emitY);
        //scale(this.scale1);
        noFill();
        stroke(169, 239, 255,this.alpha);
        strokeWeight(2);

        circle(this.x,this.y,10);
        pop();
      }

     getY(){
      return this.y;
     }

     getX(){
      return this.x;
     }
     
     setX(x){
      this.x = x
     }

     setY(y){
      this.y = y;
     }

     setSpeed(s){
      this.ySpeed = s;
     }
      
    }
