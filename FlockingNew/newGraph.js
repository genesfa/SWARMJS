class NewGraph {

    isGraph;
    noRestart = true;
    dataPointsArray = [];
    dataArray2 = [];
    Boids;
    updateInterval;
    time;
    chart;

    constructor(flock) {

        this.Boids = flock.getBoids();

         this.updateInterval = 3000;


         this.time = new Date;
         this.isGraph = true;
    }








    updateChart() {

        if (this.isGraph) {
            this.time.setTime(this.time.getTime() + this.updateInterval);
            let Boids = flock.getBoids();
            //console.log(Boids[0].period)
            for (let j = 0; j < Boids.length; j++) {
                let randomValue = Math.round((.5 + Math.random() * (-.5 - .5)) * 100);

                let data = Boids[j].phase;

                this.dataPointsArray[j].push({
                    x: this.time.getTime(),
                    y: data
                });
            }
            this.chart.render();
        }
    }
    makeGraph() {


        for (let i = 0; i < this.Boids.length; i++) {
            this.dataPointsArray.push([])
            this.dataArray2.push({
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "####.00",
                xValueFormatString: "mm:ss",
                showInLegend: false,
                name: "Boid " + i,
                //dataPoints: dataPoints1
                dataPoints: this.dataPointsArray[i]
            });
        }

         this.chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled: true,
            title: {
                text: "Graph for Fire-Fly Synchronisation"
            },
            axisX: {
                valueFormatString: "mm:ss",
                title: "chart updates every 3 secs"
            },
            axisY: {
                prefix: ""
            },
            toolTip: {
                shared: true
            },
            legend: {
                /*
                cursor:"pointer",
                verticalAlign: "top",
                fontSize: 22,
                fontColor: "dimGrey",
                itemclick : toggleDataSeries
                */

            },
            data: this.dataArray2
        });






// generates first set of dataPoints
        this.updateChart();
/*

*/

    }

}
/*
window.onload = function () {
    console.log("TEST")
   makeGraph();
}*/
