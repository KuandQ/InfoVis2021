function plot(data){
  var config = {
    parent: '#drawing_region',
    width: 1000,
    height: 256,
    margin: {top:10, right:10, bottom:20, left:60},
    xticks: 4,
    yticks: 10,
  };

  let lineChart = new LineChart( config, data );
  lineChart.update();
}


d3.csv("https://kuandq.github.io/InfoVis2021/final/data.csv")
    .then( data => {
        data.forEach( d => { d.Age = +d.Age; d.Potential = +d.Potential; });
        plot(data)
    })
    .catch( error => {
        console.log( error );
    });
