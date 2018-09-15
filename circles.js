const data = [{
    name: 'Nucleus',
    items: getNames(3)
}, {
    name: 'Shouldering Core Activity',
    items: getNames(25)
}, {
    name: 'Participating',
    items: getNames(50)
}];

const color = [
    '#6BA3A3',
    '#8AD18A',
    '#FFA8A8',
    '#FFCFA8',
];

const svg = d3.select('#circles');

svg.selectAll('g')
    .data(data.reverse())
    .enter()
    .append('g')
    .each(addCircle);

function addCircle(circle, index) {
    const g = d3.select(this);
    const ringRadius = 500 / data.length;
    const textRadius = (data.length - index) * ringRadius - ringRadius*0.5;
    g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', (data.length - index) * ringRadius)
        .attr('fill', color[index % 4]);

    g.selectAll('text')
        .data(function (circle) {
            return circle.items;
        })
        .enter()
        .append('text')
        .style('font-size', 30)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('x', function(name, index, arr) {
            const angle = index*Math.PI*2 / arr.length;
            const sin = Math.sin(angle);
            return Math.cos(angle)*(textRadius + Math.abs(sin)*ringRadius*0.4);
        })
        .attr('y', function(name, index, arr) {
            const fraction = (index / arr.length);
            let y;
            if (fraction <= 0.25){
                y = -fraction*4;
            } else if (fraction >= 0.75) {
                y = -(fraction - 1)*4;
            } else {
                y = (fraction - 0.5)*4;
            }
            return Math.sign(y)*Math.pow(Math.abs(y), 0.95)*(textRadius + ringRadius*0.2);
        })
        .attr('z', 100)
        .text(function (name) {
            return name;
        });
}