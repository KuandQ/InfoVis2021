var config = {
  parent: '#drawing_region',
  width: 256,
  height: 256,
  radius: 128,
  margin: {top:10, right:10, bottom:20, left:60},
};

d3.csv("https://kuandq.github.io/InfoVis2021/W08/w08_task1.csv")
    .then( data => {
        let pieChart = new PieChart(config, data)
        pieChart.update()
    })
    .catch( error => {
        console.log( error );
    });
