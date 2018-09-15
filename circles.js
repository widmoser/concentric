d3.select('#circles')
    .selectAll('text')
    .data(['Tara', 'Alexis', 'Jan'])
    .enter()
    .append('text')
    .style('font-size', 50)
    .attr('x', function(d, i) {
        return Math.cos(i*Math.PI*2 / 3)*200;
    })
    .attr('y', function(d, i) {
        return Math.sin(i*Math.PI*2 / 3)*200;
    })
    .text(function (d) {
        return d;
    });