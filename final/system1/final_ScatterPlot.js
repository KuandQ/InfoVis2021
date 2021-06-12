class ScatterPlot1 {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:30, right:10, bottom:30, left:30}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;
        let selectedPotential = undefined;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            //.domain([d3.min(data, d=>d.x),d3.max(data,d =>d.x)])
            .range( [ self.inner_height,0] );

        self.xaxis = d3.axisBottom( self.xscale )
            //.tickValues( data_set.filter( function(d,i){ return !(i % 2); }));
            .ticks(10);


        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        self.xaxis_group.append("text")
            .text("age")
            .attr("x",self.inner_width/2)
            .attr("y",30)
            .attr("font-family","sans-serif")
            .attr("font-size","10pt")
            .attr("fill","black");


        self.xaxis_group.append("text")
            .text("FIFA 19 DATASET")
            .attr("x",self.inner_width/2)
            .attr("y",-430)
            .attr("font-family","sans-serif")
            .attr("font-size","20pt")
            .attr("fill","black");



        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(3);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0,0)`);

        self.yaxis_group.append("text")
            .text("potential")
            .attr("x",-30)
            .attr("y",self.inner_height/2)
            .attr("font-family","sans-serif")
            .attr("font-size","10pt")
            .attr("fill","black");
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.Age );
        const xmax = d3.max( self.data, d => d.Age );
        self.xscale.domain( [17, xmax] );

        const ymin = d3.min( self.data, d => d.Potential );
        const ymax = d3.max( self.data, d => d.Potential );
        self.yscale.domain( [80, ymax] );

        self.render();
        //self.xlabel();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.Age ) )
            .attr("cy", d => self.yscale( d.Potential ) )
            .attr("r", d => d.Potential/30 )
            .attr("fill", d => "black")
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                        .style('opacity', 1)
                        .html(`<div class="tooltip-label">Position</div>(${d.Age}, ${d.Potential})`);
                })
                .on('mousemove', (e) => {
                    const padding = 10;
                    d3.select('#tooltip')
                        .style('left', (e.pageX + padding) + 'px')
                        .style('top', (e.pageY + padding) + 'px');
                })
                .on('mouseleave', () => {
                    d3.select('#tooltip')
                        .style('opacity', 0);
                })
            .on('click', d => {
              selectedPotential = d.Potential;
            }).merge(self.chart)
                 .attr("fill",d =>"black" )





        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );


    }
}
