
let flock;
let alignSlider, cohesionSlider, separationSlider,neighbordistSlider;
let period = 40.0;
let radio;
 function setup() {
    // size(640, 360);
    textSize(15);
    noStroke();

    createCanvas(800, 360);
    alignSlider = createSlider(0, 5, 1.0, 0.1);

    cohesionSlider = createSlider(0, 5, 1.0, 0.1);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    neighbordistSlider = createSlider(0, 100, 50, 0.1);
    alignSlider.position(20, 370)
    cohesionSlider.position(200, 370)
    separationSlider.position(400, 370)
    neighbordistSlider.position(600, 370)

     radio = createRadio();
     radio.option('Flocking On');
     radio.option('Flocking Off');
      radio.position(400,400, 0);
     radio.selected('Flocking On')


       button = createButton('Restart Simulation')
       button.position(200,400, 0);
       button.mousePressed(restart);
    flock = new Flock();


    // Add an initial set of boids into the system
    for (let i = 0; i < 150; i++) {
        let count = random(0.0, period);
        flock.addBoid(new Boid(random(0, width), random(0, height), (period * random(0.97, 1.03)), count));


    }
}

function draw(){

    background(50);



    let val = radio.value();
    if (val) {
        if (val === 'Flocking On') {
            flock.run(true);
        } else
        {
            flock.run(false);
        }
    }


    text('Align Force (0-5): ' + alignSlider.value(), 20,350);
    text('Cohesion Force (0-5): ' + cohesionSlider.value(), 200,350);
    text('Separation Force (0-5): ' + separationSlider.value(), 400,350);
    text('Neighbor dist (0-100): ' + neighbordistSlider.value(), 600,350);
}

function restart(){
flock.deleteAllBoid();
    for (let i = 0; i < 150; i++) {
        let count = random(0.0, period);
        flock.addBoid(new Boid(random(0, width), random(0, height), (period * random(0.97, 1.03)), count));


    }
}
function mousePressed() {
    flock.addBoid(new Boid(mouseX,mouseY,random(0,height),(period*random(0.97, 1.03)), random(0, period)));
   // flock.blink();
}
