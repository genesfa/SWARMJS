
    window.onload = function () {

    var dataPoints1 = [];
    var dataPoints2 = [];
    let lineCount = 150;
    var dataPointsArray = [];

    var dataArray2 = [];
    for (let i = 0; i < lineCount; i++) {
    dataPointsArray.push([])
    dataArray2.push({
    type: "line",
    xValueType: "dateTime",
    yValueFormatString: "$####.00",
    xValueFormatString: "hh:mm:ss TT",
    showInLegend: true,
    name: "Company " + i,
    //dataPoints: dataPoints1
    dataPoints: dataPointsArray[i]
});
}
    var dataArray = [{
    type: "line",
    xValueType: "dateTime",
    yValueFormatString: "$####.00",
    xValueFormatString: "hh:mm:ss TT",
    showInLegend: true,
    name: "Company A",
    //dataPoints: dataPoints1
    dataPoints: dataPointsArray[0]
},
{
    type: "line",
    xValueType: "dateTime",
    yValueFormatString: "$####.00",
    showInLegend: true,
    name: "Company B" ,
    //dataPoints: dataPoints2
    dataPoints: dataPointsArray[1]
}];

    var chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    title: {
    text: "Graph for Fire-Fly Synchronisation"
},
    axisX: {
    title: "chart updates every 3 secs"
},
    axisY:{
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
    data: dataArray2
    /*[{
type: "line",
xValueType: "dateTime",
yValueFormatString: "$####.00",
xValueFormatString: "hh:mm:ss TT",
showInLegend: true,
name: "Company A",
dataPoints: dataPoints1
},
{
type: "line",
xValueType: "dateTime",
yValueFormatString: "$####.00",
showInLegend: true,
name: "Company B" ,
dataPoints: dataPoints2
}]*/
});

    function toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
}
    else {
    e.dataSeries.visible = true;
}
    chart.render();
}

    var updateInterval = 3000;
// initial value
    var yValue1 = 600;
    var yValue2 = 605;

    var time = new Date;
// starting at 9.30 am
    /*
    time.setHours(9);
    time.setMinutes(30);
    time.setSeconds(0);
    time.setMilliseconds(0);
*/
    function updateChart() {
    // count = count || 1;
    //  var deltaY1, deltaY2;
    //  for (var i = 0; i < count; i++) {
    /*
      time.setTime(time.getTime()+ updateInterval);
      deltaY1 = .5 + Math.random() *(-.5-.5);
      deltaY2 = .5 + Math.random() *(-.5-.5);

      // adding random value and rounding it to two digits.
      yValue1 = Math.round((yValue1 + deltaY1)*100)/100;
      yValue2 = Math.round((yValue2 + deltaY2)*100)/100;

      // pushing the new values
*/
    // dataPoints1.push({
    time.setTime( time.getTime()+ updateInterval);
    let Boids = flock.getBoids();
    for (let j = 0; j < lineCount; j++) {
    let randomValue = Math.round((.5 + Math.random() *(-.5-.5))*100);
    let data = Boids[j].count;
    dataPointsArray[j].push({
    x: time.getTime(),
    y: data
});
}
    /*
    dataPointsArray[0].push({
      x: time.getTime(),
      y: yValue1
    });
   // dataPoints2.push({
    dataPointsArray[1].push({
      x: time.getTime(),
      y: yValue2
    });*/
    // }

    // updating legend text with  updated with y Value
    chart.options.data[0].legendText = " Company A  $" + yValue1;
    chart.options.data[1].legendText = " Company B  $" + yValue2;
    chart.render();
}
// generates first set of dataPoints
    updateChart();
    setInterval(function(){updateChart()}, updateInterval);

}
