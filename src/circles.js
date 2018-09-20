/**
 * Renders concentric circles.
 *
 * @param rootElement a d3js selection of the root element to which the svg elements should be appended. This is
 * typically an <svg> element.
 * @param data An array of objects, where each object contains an items property which holds a string array. The
 * renderer will create a concentric circle for each object and render the strings contained in the items inside the
 * circle.
 */
function renderCircles(rootElement, data) {
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
        if (fraction <= 0.25) {
            return -fraction * 4;
        } else if (fraction >= 0.75) {
            return -(fraction - 1) * 4;
        } else {
            return (fraction - 0.5) * 4;
        }
    }

    const viewBox = rootElement.viewBox.baseVal;
    const smallerViewBoxSize = Math.min(viewBox.width, viewBox.height);
    const minTextSize = smallerViewBoxSize * 0.02;

    const translateX = viewBox.x + viewBox.width/2;
    const translateY = viewBox.y + viewBox.height/2;

    d3.select(rootElement).selectAll('g')
        .data(data.reverse())
        .enter()
        .append('g')
        .attr('transform', 'translate(' + translateX + ' ' + translateY + ')')
        .each(addCircle);

    function addCircle(circle, index) {
        const g = d3.select(this);
        const ringRadius = smallerViewBoxSize * 0.5 / data.length;
        const textRadius = (data.length - index) * ringRadius - ringRadius * 0.5;
        const textSize = Math.min(textRadius * 3 / circle.items.length, minTextSize);
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
            .attr('x', function (name, index, arr) {
                const fraction = (index / arr.length);
                const sign = (fraction > 0.25) && (fraction < 0.75) ? -1 : 1;
                const angle = Math.asin(linearY(fraction));
                return sign * Math.cos(angle) * textRadius;
            })
            .attr('y', function (name, index, arr) {
                const fraction = (index / arr.length);
                return linearY(fraction) * textRadius;
            })
            .attr('z', 100)
            .text(function (name) {
                return name;
            });
    }
}