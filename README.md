# concentric

This library provides a javascript implementation to render concentric circles with words in them. 

The rendering can be accessed via different means.

## Web server

Run locally with 

```shell
npm start
```

The web server provides two endpoints:

### GET /api/circles

Renders concentric circles into an SVG image. The entire rendering data is encoded as query parameters making this endpoint feasible for sharing the url. The following query parameters are supported.

- *c* (Required) A list of labels that go into a concentric circle separated by `|`. Note that you can use multiple `c` parameters to specify the concentric circles starting with the innermost one.
  Example: [`/api/circles?c=a|b|c&c=d|e|f`](https://us-central1-concentric-circles.cloudfunctions.net/renderWithQuery?c=a|b|c&c=d|e|f)
- *w* (Optional) The width of the resulting SVG. Default 1000 pixels.
- *h* (Optional) The height of the resulting SVG. Default 1000 pixels.
- *d* (Optional) Whether to show a download prompt instead of rendering the SVG in the browser. In order to enable this you have to append `d=true` as a query parameter. Default *false*.

### POST /api/render

Renders concentric circles into an SVG image. The entire rendering data is encoded as json POST data. The json object has the following fields.

- *circles* (Required) An array of json objects where each object has the following fields.
    - *items* (Required) An array of strings that should be rendered within this circle.  
- *width* (Optional) The width of the resulting SVG. Default 1000 pixels.
- *height* (Optional) The height of the resulting SVG. Default 1000 pixels.
- *download* (Optional) Whether to show a download prompt instead of rendering the SVG in the browser. Default *false*.

## GCloud functions

### GET based endpoint

Deploy with

```shell
gcloud functions deploy renderWithQuery
```

Access at 

```
https://us-central1-concentric-circles.cloudfunctions.net/renderWithQuery
```

### POST based endpoint

Deploy with

```shell
gcloud functions deploy renderWithPostData
```

Access at 

```
https://us-central1-concentric-circles.cloudfunctions.net/renderWithPostData
```
