class rcSineWave{

    constructor(spacing,w,theta,amp,period,dx,yvalues,color){
        this.width = w;
        this.xspacing = spacing;
        this.theta = theta;
        this.amplitude = amp;
        this.period = period;
        this.dx = dx;
        this.yvalues = yvalues;
        this.color = color;
        this.scale = 1;
        this.xPos = 0;
        this.yPos = 0;
    }

    
    calcWave() {
        // Increment theta (try different values for
        // 'angular velocity' here)
        this.theta += 0.02;
      
        // For every x value, calculate a y value with sine function
        let x = this.theta;
        for (let i = 0; i < this.yvalues.length; i++) {
          yvalues[i] = sin(x) * this.amplitude;
          x += this.dx;
        }
      }
      
    rcRenderWave(scale,initial) {
        noStroke();
        fill(this.color);
        
       
        for (let x = 0; x < this.yvalues.length; x++) {
          let es = scale;
          if(scale > 0){
            es =  initial + scale*x;
          }
        if(scale < 0){
            es *= -1;
          }
            ellipse(x * this.xspacing, height / 2 + yvalues[x], es, es);
            this.scale = es;  
          
        }
      }

      
   
      //set where the sineWave will be drawn at
      setPosition(x,y){
        this.xPos = x;
        this.yPos = y;
        translate(this.xPos,this.yPos)
      }


      //array amplitude increases
      rcWhirlPool(ampSpeed,upperlimit) {
       
      
        if(this.amplitude < upperlimit){
          this.amplitude = this.amplitude + ampSpeed;
          
        }
        

     
      }
}