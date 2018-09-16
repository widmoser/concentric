const data = [{
    name: 'Nucleus',
    items: getNames(5)
}, {
    name: 'Shouldering Core Activity',
    items: getNames(15)
}, {
    name: 'Participating',
    items: getNames(30)
}, {
    name: 'Contacts',
    items: getNames(80)
}];

const color = [
    '#6BA3A3',
    '#8AD18A',
    '#FFA8A8',
    '#FFCFA8',
];

/**
 * Returns a y value for an angle expressed as a fraction of 2*PI.
 *
 * The value is a replacement for sinus and growths linearly proportional to the fraction.
 */
function linearY(fraction) {
    if (fraction <= 0.25){
        return -fraction*4;
    } else if (fraction >= 0.75) {
        return -(fraction - 1)*4;
    } else {
        return (fraction - 0.5)*4;
    }
}

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
    const textSize = Math.min(textRadius*3 / circle.items.length, 20);
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
        .style('font-size', textSize)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('x', function(name, index, arr) {
            const fraction = (index / arr.length);
            const sign = (fraction > 0.25) && (fraction < 0.75) ? -1 : 1;
            const angle = Math.asin(linearY(fraction));
            return sign*Math.cos(angle)*textRadius;
        })
        .attr('y', function(name, index, arr) {
            const fraction = (index / arr.length);
            return linearY(fraction)*textRadius;
        })
        .attr('z', 100)
        .text(function (name) {
            return name;
        });
}