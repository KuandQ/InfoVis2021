let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://kuandq.github.io/InfoVis2021/final/data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.Wage = +d.Wage;
            d.Age = +d.Age;
        });

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Age',
            ylabel: 'Wage [C]',
        }, input_data );
        scatter_plot.update();

        line_chart = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Age',
        }, input_data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

/*function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.age ) );
    }
    scatter_plot.update();
}
*/
