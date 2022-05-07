class Flock {
    boids;
    constructor() {
         this.boids = []
    }

    run() {
        for (let b of this.boids){
            b.run(this.boids);
        }
    }

    addBoid( b){
        this.boids.push(b);
        }

}
