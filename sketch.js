let b;
let grav;

function setup() {
  createCanvas(400, 400);
  grav = createVector(0, 1);
  b = new Bouncer(100, 100, 10, 0, 3, 6, 3); // last arg is mass
  ellipseMode(RADIUS);
}

function draw() {
  background(220);
  b.update();
}

class Bouncer {
  constructor(x, y, r, redVal, velX, velY, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.mass = mass;
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
    let f = p5.Vector.div(force, this.mass); // F = ma → a = F/m
    this.acc.add(f);
  }

  update() {
    this.applyForce(grav);       
    this.vel.add(this.acc);      
    this.pos.add(this.vel);      
    this.acc.mult(0);            
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
    circle(this.pos.x, this.pos.y, this.r * this.mass); // mass affects size too, optionally
  }
  
}
function keyPressed() {
  let force = createVector(0, 0);
  let forceAmount = 0.5;

  if (keyCode === LEFT_ARROW) {
    force = createVector(-forceAmount, 10);
  } else if (keyCode === RIGHT_ARROW) {
    force = createVector(forceAmount, 10);
  } else if (keyCode === UP_ARROW) {
    force = createVector(10, -forceAmount * 2); // stronger upward push
  } else if (keyCode === DOWN_ARROW) {
    force = createVector(10, forceAmount);
  }

  b.applyForce(force);
}

