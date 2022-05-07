class Boid {
     position;
     velocity;
     acceleration;
     r;
     maxForce;    // Maximum steering force
     maxSpeed;
    neighbordist;
    constructor( x,y) {
        this.acceleration = createVector(0,0);
        let angle = random(TWO_PI);

        this.velocity = createVector(cos(angle), sin(angle));
        this.position = createVector(x,y);
        this.r = 2.0;
        this.maxSpeed = 2;
        this.maxForce = 0.03;
        this.neighbordist = neighbordistSlider.value();
    }

     run(boids) {
        this.flock(boids);
        this.update();
        this.borders();
        this.render();
    }
    
    applyForce(force) {
        this.acceleration.add(force);
    }

    // We accumulate a new acceleration each time based on three rules
    flock(boids) {
        let sep = this.separate(boids);   // Separation
        let ali = this.align(boids);      // Alignment
        let coh = this.cohesion(boids);   // Cohesion
        // Arbitrarily weight these forces
        /*
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);
        */
        ali.mult(alignSlider.value());
        coh.mult(cohesionSlider.value());
        sep.mult(separationSlider.value());

        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);


    }
    // Method to update position
     update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxSpeed);
         this.position.add(this.velocity);
        // Reset accelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
     seek( target) {

    let desired = p5.Vector.sub(target, this.position);  // A vector pointing from the position to the target
    // Scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);

    // Above two lines of code below could be condensed with new PVector setMag() method
    // Not using this method until Processing.js catches up
    // desired.setMag(maxspeed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);  // Limit to maximum steering force
    return steer;
}

     render() {
        // Draw a triangle rotated in the direction of velocity
        let theta = this.velocity.heading() + radians(90);
        // heading2D() above is now heading() but leaving old syntax until Processing.js catches up

        fill(200, 100);
        stroke(255);
        push();
        //pushMatrix();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape(TRIANGLES);
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape();
        //popMatrix();
         pop();
    }

    // Wraparound
     borders() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }

    // Separation
    // Method checks for nearby boids and steers away
     separate ( boids) {
         let desiredseparation = 25.0;

    let steer = createVector(0, 0, 0);
    let count = 0.0;
    // For every boid in the system, check if it's too close
    for (let other of boids) {
    let distance = p5.Vector.dist(this.position, other.position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((distance > 0) && (distance < desiredseparation)) {
    // Calculate vector pointing away from neighbor
    let diff = p5.Vector.sub(this.position, other.position);
    diff.normalize();
    diff.div(distance);        // Weight by distance
    steer.add(diff);
    count++;            // Keep track of how many
}
}
// Average -- divide by how many
if (count > 0) {
    steer.div(count);
}

// As long as the vector is greater than 0
if (steer.mag() > 0) {
    // First two lines of code below could be condensed with new PVector setMag() method
    // Not using this method until Processing.js catches up
    // steer.setMag(maxspeed);

    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.velocity);
    steer.limit(this.maxForce);
}
return steer;
}

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
     align ( boids) {
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
        let d = p5.Vector.dist(this.position, other.position);
    if ((d > 0) && (d < this.neighbordist)) {
    sum.add(other.velocity);
    count++;
}
}
if (count > 0) {
    sum.div(count);
    // First two lines of code below could be condensed with new PVector setMag() method
    // Not using this method until Processing.js catches up
    // sum.setMag(maxspeed);

    // Implement Reynolds: Steering = Desired - Velocity
    sum.normalize();
    sum.mult(this.maxSpeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
    return steer;
}
else {
    return createVector(0, 0);
}
}
    // Cohesion
    // For the average position (i.e. center) of all nearby boids, calculate steering vector towards that position
     cohesion ( boids) {

    let sum = new createVector(0, 0); // Start with empty vector to accumulate all positions
    let count = 0;
    for (let other of boids) {
    let d = p5.Vector.dist(this.position, other.position);
    if ((d > 0) && (d < this.neighbordist)) {
    sum.add(other.position); // Add position
    count++;
}
}
if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the position
}
else {
    return createVector(0, 0);
}
}

}
