let input_data;
let bubble_chart;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://kuandq.github.io/InfoVis2021/final/data.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.Potential = +d.Potential;
            d.Age = +d.Age;
            d.HeadingAccuracy = +d.HeadingAccuracy;
        });


        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['L. Messi','Cristiano Ronaldo','Neymar Jr','De Gea','K. De Bruyne','E. Hazard','L. Modri','L. Surez','Sergio Ramos','J. Oblak','R. Lewandowski','T. Kroos','D. Godn','David Silva','N. Kant','P. Dybala','H. Kane','A. Griezmann','M. ter Stegen','T. Courtois','Sergio Busquets','E. Cavani','M. Neuer','S. Agero','G. Chiellini','K. Mbapp','M. Salah','Casemiro','J. Rodrguez','L. Insigne','Isco','C. Eriksen','Coutinho','P. Aubameyang','M. Hummels','Marcelo','G. Bale','H. Lloris','G. Higua']);

        bubble_chart = new BubbleChart( {
            parent: '#drawing_region_bubblechart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'Age',
            ylabel: 'HeadingAccuracy [C]',
            cscale: color_scale
        }, input_data );
        bubble_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:90},
            xlabel: 'Name',
            ylabel: 'classification',
            cscale: color_scale
        }, input_data );
        bar_chart.update();


        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 512,
            margin: {top:50, right:60, bottom:50, left:100},
        }, input_data );
        scatter_plot.update();

       d3.select('#reverse')
            .on('click', d => {
            scatter_plot.data.reverse();
            scatter_plot.update();
            });

        d3.select('#ascend')
            .on('click', d => {
            scatter_plot.data.sort((a,b)=>a.Potential-b.Potential);
            scatter_plot.update();
            });



        scatter_plot1 = new ScatterPlot1( {
            parent: '#drawing_region_scatterplot1',
            width: 512,
            height: 512,
            margin: {top:50, right:60, bottom:50, left:100},
            xlabel: 'Age',
            ylabel: 'Potential [C]',
        }, input_data );
        scatter_plot1.update();

       lineChart = new LineChart({
            parent: '#drawing_region_linechart',
            width: 1000,
            height: 256,
            margin: {top:10, right:10, bottom:20, left:60},
            xticks: 4,
            yticks: 5,
          },input_data );
          lineChart.update();
        })
            .catch( error => {
                console.log( error );
            });




/*function Filter() {
    if ( filter.length == 0 ) {
        bubble_chart.data = input_data;
    }
    else {
        bubble_chart.data = input_data.filter( d => filter.includes( d.Age ) );
    }
    scatter_plot.update();
}*/
