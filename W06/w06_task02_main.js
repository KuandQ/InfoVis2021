d3.csv("https://kuandq.github.io/InfoVis2021/W04/w04_task.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });
        ShowScatterPlot( data );
    })
    .catch( error => {
        console.error( error );
    });


function ShowScatterPlot( data ) {
  const margin = {top: 40, right: 20, bottom: 100, left: 100};
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

  //Create Title
  svg.append("text")
     .attr("x", width/2)
     .attr("y", 0)
     .style("text-anchor", "middle")
     .style("fill","red")
     .style("font-weight","bold")
     .style("font-size","30px")
     .text("Title of Diagram");

//X axis title
  svg.append("text")
     .attr("text-anchor","end")
     .attr("x", width/2 + 30)
     .attr("y", height + margin.top + 40)
     .text("X axis title");

//Y axis title
  svg.append("text")
     .attr("text-anchor","end")
     .attr("transform","rotate(-90)")
     .attr("y", -margin.left + 20)
     .attr("x", -margin.top - 100)
     .text("Y axis title");

//ymax
  svg.append("text")
    .attr("text-anchor","end")
    .attr("x", -10)
    .attr("y", -10)
    .style("font-size","10px")
    .text("ymax");

//ymin
  svg.append("text")
    .attr("text-anchor","end")
    .attr("y", height + 10)
    .attr("x", -10 )
    .style("font-size","10px")
    .text("ymin");

//xmin
    svg.append("text")
      .attr("text-anchor","end")
      .attr("x", 15)
      .attr("y", height + 30)
      .style("font-size","10px")
      .text("xmin");

//xmax
    svg.append("text")
      .attr("text-anchor","end")
      .attr("y", height + 30)
      .attr("x", width + 20)
      .style("font-size","10px")
      .text("xmax");

  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", d => x(d.x))
     .attr("cy", d => y(d.y))
     .attr("r", d => d.r)
     .style("fill", function(d){ return d.color; });
};
