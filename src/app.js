const express = require('express');
const bodyParser = require('body-parser')
const endpoints = require('./endpoints');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/api/circles', endpoints.renderWithQuery);
app.post('/api/render', endpoints.renderWithPostData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// GCloud function support.
exports.renderWithQuery = endpoints.renderWithQuery;
exports.renderWithPostData = endpoints.renderWithPostData;