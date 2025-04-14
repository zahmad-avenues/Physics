
let b 
let c
let redVal
let vel
let pos
let grav
function setup() {
  createCanvas(400, 400);
  grav = createVector(0,1)
  b = new Bouncer(100,100,10,0,5);
  
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
  constructor(x,y,r,redVal,velX,velY) {
   // this.x = x
 //   this.y = y
    this.pos = createVector(x,y)
    this.vel = createVector(velX,velY)
    this.r = r
    this.redVal = redVal
    this.c = color(redVal,200,200)
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
   // this.dx += this.v
    this.pos.add(this.vel)  
  }
  
  applyGravity() {
   // this.dy += G
    this.vel.add(grav)
  }
  
  update() {
    this.applyGravity()
    this.applyVelocity()
    this.move()
    this.draw()
  }
  
  move() {
   // this.x += this.dx
  //  this.y += this.dy
    this.pos.add(this.vel)
    if( this.pos.x < this.minX ) {
      this.pos.x = this.minX
      this.vel.x *= -1
      this.changeColor()
    }
    if( this.pos.x > this.maxX ) {
      this.pos.x = this.maxX
      this.vel.x *= -1
      this.changeColor()
    }    
    if( this.pos.y < this.minY ) {
      this.pos.y = this.minY
      this.vel.y *= -1
      this.changeColor()
    }    
    if( this.pos.y > this.maxY ) {
      this.pos.y = this.maxY
      this.vel.y *= -1
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
    circle(this.pos.x,this.pos.y,this.r)
  }
}