var tooltip = d3.tip().attr('class', 'd3-tip').html(
    function(d) { return d['Name'] + ': $' + d['Amount']; 
    });


var diameter = 500
//Color them according red/blue according to 2012 voting pattern
var color = d3.scale.ordinal()
            .domain(['R','D'])
            .range(['#B2182B','#2166AC']);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(3.5);

var svg = d3.select("#viz")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


/* modified d3-tip boilerplate */
/* Invoke the tip in the context of your visualization */
svg.call(tooltip);

d3.csv("Trump.csv", function(error, data) {

    data = data.map(function(d) {
        d.value = +d["Amount"];
        return d;
    });

    var nodes = bubble.nodes({children: data }).filter(function(d) {
        return !d.children;
    });

    
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();


    bubbles.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("cx", function(d) {return d.x; })
        .attr("cy", function(d) { return d.y; })
        .style("fill", function(d) {
            return color(d["Past"]);
        })

        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide);
        

    //format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y + 5;
        })
        .attr("text-anchor", "middle")
        //.text(function(d){ return d["State"] ; })
        .text(function(d) {
            return d["State"]; 
        });

    bubbles.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("cx", function(d) {return d.x; })
        .attr("cy", function(d) { return d.y; })
        .style("fill", function(d) {
            return "rgba(0,0,0,0)";
        })
        .on('mouseover', tooltip.show)
        .on('mouseout', tooltip.hide);

});
