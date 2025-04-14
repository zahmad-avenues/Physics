let b;
let c;
let redVal;
let vel;
let pos;
let grav;

function setup() {
  createCanvas(400, 400);
  grav = createVector(0, -0.2);
  b = new Bouncer(100, 100, 10, 0, 20, 10);
  ellipseMode(RADIUS);
}

function draw() {
  background(220);
  b.update();    
}

// a blueprint for creating circles that move around the screen
class Bouncer {
  constructor(x, y, r, redVal, velX, velY) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.r = r;
    this.redVal = redVal;
    this.c = color(redVal, 200, 200);
    this.minX = r;
    this.maxX = width - r;
    this.minY = r;
    this.maxY = height - r;
  }

  setConstraints(minX, maxX, minY, maxY) {
    this.minX = minX + this.r;
    this.maxX = maxX - this.r;
    this.minY = minY + this.r;
    this.maxY = maxY - this.r;
  }

  applyForce(force) {
    this.vel.add(force);
  }

  applyVelocity() {
    this.pos.add(this.vel);
  }

  update() {
    this.applyForce(grav);
    this.applyVelocity();
    this.move();
    this.draw();
  }

  move() {
    if (this.pos.x < this.minX) {
      this.pos.x = this.minX;
      this.vel.x *= -1;
      this.changeColor();
    }
    if (this.pos.x > this.maxX) {
      this.pos.x = this.maxX;
      this.vel.x *= -1;
      this.changeColor();
    }    
    if (this.pos.y < this.minY) {
      this.pos.y = this.minY;
      this.vel.y *= -1;
      this.changeColor();
    }    
    if (this.pos.y > this.maxY) {
      this.pos.y = this.maxY;
      this.vel.y *= -1;
      this.changeColor();
    }       
  }

  changeColor() {
    console.log("color change");
    this.redVal += 10;
    this.c = color(this.redVal, 200, 200);
  }

  draw() {
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.r);
  }
}
