class PieChart {

  constructor( config, data ) {
    this.config = {
      parent: config.parent,
      width: config.width || 256,
      height: config.height || 128,
      margin: config.margin || {top:10, right:10, bottom:10, left:10},
      radius: config.radius || 128,
    };
    this.data = data;
    this.init();
  }

  init(){
    let self = this;

    self.svg = d3.select( self.config.parent )
        .attr('width', self.config.width)
        .attr('height', self.config.height);

    self.chart = self.svg.append('g')
        .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

    self.pie = d3.pie()
        .value(d => d.value);

    self.arc = d3.arc()
        .innerRadius(0)
        .outerRadius(self.config.radius);

  }

  update(){
    let self = this;

    self.render();
  }


  render(){
    let self = this;

    self.chart.selectAll('pie')
        .data(self.pie(self.data))
        .enter()
        .append('path')
        .attr('d', self.arc)
        .attr('fill', d => d.color)
        .attr('stroke', 'black')
        .style('stroke-width', '2px');

   }

}
