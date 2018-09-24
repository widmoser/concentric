const express = require('express');
const endpoints = require('./endpoints');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/render', endpoints.renderWithQuery);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// GCloud function support.
exports.renderWithQuery = endpoints.renderWithQuery;