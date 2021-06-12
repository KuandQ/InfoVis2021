class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:30, right:10, bottom:10, left:60}
        }
        this.data = data;
        this.num = 0;
        this.init();
    }



    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;





    }

    update() {
        let self = this;

        console.log(self.data);

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.Potential)])
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.Name))
            .range( [0, self.inner_height] )
            .paddingInner(0.5);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);



        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        if(self.num<1){
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0,0)`);




      /*  self.xaxis_group.append("text")
            .text("NAME")
            .attr("x",self.inner_width/2)
            .attr("y",50)
            .attr("font-family","sans-serif")
            .attr("font-size","10pt")
            .attr("fill","black");


        self.xaxis_group.append("text")
            .text("Potential")
            .attr("x",self.inner_width/2)
            .attr("y",-20)
            .attr("font-family","sans-serif")
            .attr("font-size","20pt")
            .attr("fill","black")*/

        }

        self.render();

        self.num++;
    }


      render(){
        let self = this;

        self.chart.selectAll("rect")
            .data(self.data)
            .join("rect")
            .transition().duration(700)
          //  .enter()
          //  .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.Name))
            .attr("width", d => self.xscale(d.Potential))
            .attr("height", self.yscale.bandwidth())
            .attr("fill", d => d.c );

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );


      }
    }
