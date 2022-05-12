
let flock;
let graph;
let alignSlider, cohesionSlider, separationSlider,neighbordistSlider, boidCountSlider;
let period = 40.0;
let radio;
let radio2;
 function setup() {
    // size(640, 360);
    textSize(15);
    noStroke();

    var canvas = createCanvas(1000, 360);
    canvas.parent('canvasForHTML');
    alignSlider = createSlider(0, 5, 1.0, 0.1);

    cohesionSlider = createSlider(0, 5, 1.0, 0.1);
    separationSlider = createSlider(0, 5, 1.5, 0.1);
    neighbordistSlider = createSlider(0, 100, 50, 0.1);
     boidCountSlider = createSlider(1, 300, 150, 1);
    alignSlider.position(20, 370)
    cohesionSlider.position(200, 370)
    separationSlider.position(400, 370)
    neighbordistSlider.position(600, 370)
     boidCountSlider.position(800, 370)
     radio = createRadio();
     radio.option('Flocking On');
     radio.option('Flocking Off');
      radio.position(400,400, 0);
     radio.selected('Flocking On')
     /*
     radio2 = createRadio();
     radio2.option('Graph On');
     radio2.option('Graph Off');
     radio2.position(600,400, 0);
     radio2.selected('Graph On')
    */
       button = createButton('Restart Simulation')
       button.position(200,400, 0);
       button.mousePressed(restart);

        button2 = createButton('Toggel Graph On/Off')
        button2.position(800,400, 0);

    flock = new Flock();


    // Add an initial set of boids into the system
    for (let i = 0; i < boidCountSlider.value(); i++) {
        let count = random(0.0, period);
        flock.addBoid(new Boid(random(0, width), random(0, height), (period), count));


    }
    graph = new NewGraph(flock);
    graph.makeGraph()

     setInterval(function () {
         graph.updateChart()
     }, graph.updateInterval);
     button2.mousePressed(toggleGraph);
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
    text('Boid Count (1-100): ' + boidCountSlider.value(), 800,350);
}


function toggleGraph(){
    graph.isGraph = !graph.isGraph
}
function restart(){
flock.deleteAllBoid();
    for (let i = 0; i < boidCountSlider.value(); i++) {
        let count = random(0.0, period);
        flock.addBoid(new Boid(random(0, width), random(0, height), (period), count));


    }
    graph = new NewGraph(flock);
    graph.makeGraph()
}

