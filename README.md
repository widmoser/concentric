# concentric

This library provides a javascript implementation to render concentric circles with words in them. 

The rendering can be accessed via different means.

## Web server

The web server provides two endpoints:

### GET /render/api

Renders concentric circles into an SVG image. The entire rendering data is encoded as query parameters making this endpoint feasible for sharing the url. The following query parameters are supported.

- *c* (Required) A list of labels that go into a concentric circle separated by `|`. Note that you can use multiple `c` parameters to specify the concentric circles starting with the innermost one.

Example: [`/render/api?c=a|b|c&c=d|e|f`](https://us-central1-concentric-circles.cloudfunctions.net/renderWithQuery?c=a|b|c&c=d|e|f)

- *w* (Optional) The width of the resulting SVG.

- *h* (Optional) The height of the resulting SVG.

- *d* (Optional) Whether to show a download prompt instead of rendering the SVG in the browser. In order to enable this you have to append `d=true` as a query parameter.
