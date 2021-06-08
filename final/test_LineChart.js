class LineChart {

  constructor( config, data ) {
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height || 156,
      margin: config.margin || {top:10, right:10, bottom:10, left:10},
      xticks: config.xticks || 10,
      yticks: config.yticks || 10,
    }
    this.data = data;
    this.init();
  }

  init(){
    let self = this;
    console.log(self.data)

    self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);

    let margin = self.config.margin
    self.chart = self.svg.append('g')
        .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

    self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
    self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

    self.xscale = d3.scaleLinear()
        .domain([0, d3.max(self.data, d => d.Age)])
        .range( [0, self.inner_width] );

    self.yscale = d3.scaleLinear()
        .domain([0, d3.max(self.data, d => d.Wage)])
        .range( [self.inner_height, 0] );

    self.xaxis = d3.axisBottom( self.xscale )
        .ticks(7)
        .tickSizeOuter(0);

    self.yaxis = d3.axisLeft(self.yscale)
        .tickSizeOuter(0);

    self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)
        .call(self.xaxis);

    self.yaxis_group = self.chart.append('g')
        .call(self.yaxis);

    self.line = d3.line()
        .x(d => self.xscale(d.Age))
        .y(d => self.yscale(d.Wage));
  }

  update(){
    let self = this;
    self.render();
  }


  render(){
    let self = this;

    self.chart.append('path')
        .attr('d', self.line(self.data))
        .attr('stroke','black')
        .attr('fill','none');
  }
}
