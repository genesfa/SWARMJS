
//Refferances:
//https://www.youtube.com/watch?v=mhjuuHl6qHM
//https://processing.org/examples/flocking.html

class Boid {
    constructor() {
      //  this.position = createVector(random(width), random(height));
        this.position = createVector((width/2), (height/2));
        this.velocity = p5.Vector.random2D();
        // Random Speed
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = 0.03;
        this.maxSpeed = 2;
        this.r = 1;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > width) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }


    seperation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other !== this && distance < perceptionRadius ) {
                let differance = p5.Vector.sub(this.position, other.position);
                differance.div(distance);
                steering.add(differance);
                total++;
            }
        }
        if (total >0) {
            steering.div(total);
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity);
            steering.limit(this.maxForce)


        }
        return steering;

    }

    cohesion(boids) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other !== this && distance < perceptionRadius ) {
                steering.add(other.position);
                total++;
            }
        }
        if (total >0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity);
            steering.limit(this.maxForce)


        }
        return steering;

    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(other !== this && distance < perceptionRadius ) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total >0) {
            steering.div(total);
            steering.setMag(this.maxSpeed)
           steering.sub(this.velocity);
           steering.limit(this.maxForce)


        }
        return steering;

    }
    flock(boids) {

        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.seperation(boids);
        this.acceleration.mult(0);
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        this.acceleration.add( alignment);
       this.acceleration.add(cohesion);
        this.acceleration.add(separation);


    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

    }
    show() {
        strokeWeight(8)
        stroke(255)

        let theta = this.velocity.heading() + radians(90);
        fill(200, 100);
      //  stroke(255);
        push();
      //  pushMatrix();
          translate(this.position.x, this.position.y);
         rotate(theta);
           beginShape(TRIANGLES);
          vertex(0, -this.r*2);
            vertex(-this.r, this.r*2);
            vertex(this.r, this.r*2);
            endShape(CLOSE);
            //popMatrix;
        pop();


      //  point(this.position.x, this.position.y)
       // triangle(this.position.x, this.position.x, this.position.y, this.position.y, 0,0);
    }
}
