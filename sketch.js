let G = 0.1
let b 
let c
let redVal

function setup() {
  createCanvas(400, 400);
  b = new Bouncer(100,100,10,0,0,0,10);
  
  ellipseMode(RADIUS)
}


function draw() {
  background(220);
  
    b.update()    
  
}

// a blueprint for creating circles that move around the screen
class Bouncer { // noun
  // properties of a bouncer (adjectives)
  //   where it is (location)
  //   color
  //   positional constraints
  //   size
  //   velocity
  constructor(x,y,r,redVal,dx,dy,v) {
    this.x = x
    this.y = y
    this.r = r
    this.redVal = redVal
    this.c = color(redVal,200,200)
    this.dx = dx
    this.dy = dy
    this.v = v
    this.minX = r
    this.maxX = width-r
    this.minY = r
    this.maxY = height-r
  }
  // behaviors of a bouncer (verbs)
  //   draw
  //   move
  setConstraints(minX,maxX,minY,maxY) {
    this.minX = minX + this.r
    this.maxX = maxX - this.r
    this.minY = minY + this.r 
    this.maxY = maxY - this.r
  }
  
  applyVelocity() {
    this.dx += this.v
  }
  
  applyGravity() {
    this.dy += G
  }
  
  update() {
    this.applyGravity()
    this.applyVelocity()
    this.move()
    this.draw()
  }
  
  move() {
    this.x += this.dx
    this.y += this.dy
    if( this.x < this.minX ) {
      this.x = this.minX
      this.dx *= -1
      this.changeColor()
    }
    if( this.x > this.maxX ) {
      this.x = this.maxX
      this.dx *= -1
      this.changeColor()
    }    
    if( this.y < this.minY ) {
      this.y = this.minY
      this.dy *= -1
      this.changeColor()
    }    
    if( this.y > this.maxY ) {
      this.y = this.maxY
      this.dy *= -1
      this.changeColor()
    }       
  }
  changeColor() {
    console.log("color change")
    this.redVal+=10
    this.c = color(this.redVal,200,200)
    
  }
  draw() {
    fill(this.c)
    circle(this.x,this.y,this.r)
  }
}