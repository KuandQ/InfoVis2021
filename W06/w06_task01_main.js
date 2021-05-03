d3.csv("https://kuandq.github.io/InfoVis2021/W04/w04_task.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        ShowScatterPlot( data );
    })
    .catch( error => {
        console.error( error );
    });


function ShowScatterPlot( data ) {
  const margin = {top: 20, right: 20, bottom: 40, left: 60};
  const width = 460 - margin.left - margin.right;
  const height = 460 - margin.top - margin.bottom;
  var svg = d3.select("body").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append('g')
     .attr('transform',"translate(" + margin.left +"," + margin.top + ")");



  var x = d3.scaleLinear()
     .domain( [0,200] )
     .range( [0, width] );
  svg.append("g")
     .attr("transform","translate(0," + height + ")")
     .call(d3.axisBottom(x));

  var y = d3.scaleLinear()
     .domain( [0, 200] )
     .range( [height, 0] );
  svg.append("g")
     .call(d3.axisLeft(y));

/*  var xaxis = d3.axisBottom( xscale )
     .ticks(6);
  var yaxis = d3.axisLeft( yscale )
     .ticks(6); */



  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", d => x(d.x))
     .attr("cy", d => y(d.y))
     .attr("r", d => d.r)
     .style("fill", function(d){ return d.color; });
};
