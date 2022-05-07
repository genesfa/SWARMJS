class Flock {
    boids;
    constructor() {
         this.boids = []
    }

    run() {

        for (let b of this.boids){
            b.run(this.boids);
            //b.blinkOn();
        }
    }

    async blink() {

        const sleep = (delay) => new Promise((resolve => setTimeout(resolve, delay)))
        console.log(this.boids[0])
        console.log(this.boids.length);
        console.log(random(this.boids.length))
        let randomBoid = Math.round(random(this.boids.length));
        this.boids[randomBoid].blinkOn();
        await sleep(1000);
        this.boids[randomBoid].blinkOff();

    }

    addBoid( b){
        this.boids.push(b);
        }

}
