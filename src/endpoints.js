const renderCircles = require('./circles').renderCircles;

function getNames(queryObject) {

    function transform(circles) {
        return circles.map(str => ({
            items: str.split('|')
        }));
    }

    const circles = queryObject['c'];
    if (circles === undefined) {
        throw 'Please specify at least one query parameter called c.';
    }

    if (typeof(circles) === "string") {
        return transform([ circles ]);
    }

    return transform(circles);
}

exports.renderWithQuery = (req, res) => {

    const width = req.query['w'] || 1000;
    const height = req.query['h'] || 1000;

    const D3Node = require('d3-node');
    const d3n = new D3Node();    // initializes D3 with container element
    const svg = d3n.createSVG(width, height);
    renderCircles({
        selection: svg,
        data: getNames(req.query),
        width,
        height
    });
    if (req.query['d']) {
        res.set('Content-Disposition', 'attachment; filename="concentric-circles.svg"');
    }
    res.set('Content-Type', 'image/svg+xml');
    res.send(d3n.svgString());
};

