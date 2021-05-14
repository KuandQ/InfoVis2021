function plot(data){
  var config = {
    parent: '#drawing_region',
    width: 256,
    height: 156,
    margin: {top:10, right:10, bottom:20, left:60},
    xticks: 10,
    yticks: 10,
  };

  let lineChart = new LineChart( config, data );
  lineChart.update();
}


d3.csv("https://kuandq.github.io/InfoVis2021/W04/w04_task.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        plot(data)
    })
    .catch( error => {
        console.log( error );
    });
