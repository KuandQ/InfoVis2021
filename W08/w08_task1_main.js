d3.csv("https://kuandq.github.io/InfoVis2021/W08/w08_task1.csv")
    .then(
        data => {
        data.forEach(d => { d.value = +d.value; });
        var config = {
          parent: '#drawing_region',
          width: 256,
          height: 156,
          margin: {top:10, right:10, bottom:20, left:80},
          xticks: 10,
          yticks: 10,

        };

        let barChart = new BarChart( config, data );
        barChart.update();
    })
    .catch( error => {
        console.log( error );
    });
