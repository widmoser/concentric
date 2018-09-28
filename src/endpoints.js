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
        return transform([circles]);
    }

    return transform(circles);
}

function render({width = 1000, height = 1000, circles}) {
    if (circles === undefined) {
        throw 'Please specify circles property';
    }

    const D3Node = require('d3-node');
    const d3n = new D3Node();    // initializes D3 with container element
    const svg = d3n.createSVG(width, height);
    renderCircles({
                      selection: svg,
                      data: circles,
                      width: width,
                      height: height
                  });
    return d3n.svgString();
}

function handleRequest(req, res, {width, height, circles, download}) {
    if (download === true) {
        res.set('Content-Disposition', 'attachment; filename="concentric-circles.svg"');
    }
    res.set('Content-Type', 'image/svg+xml');
    res.send(render({
                        width, height, circles
                    }));
}

exports.renderWithQuery = (req, res) => {
    const width = req.query['w'] || 1000;
    const height = req.query['h'] || 1000;
    const download = req.query['d'] === 'true';
    handleRequest(req, res, {width, height, download, circles: getNames(req.query)});
};

exports.renderWithPostData = (req, res) => {
    handleRequest(req, res, req.body);
};