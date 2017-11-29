const express = require('express');

const app = express();

// Middleware
const parser = require('body-parser');

// Router
const router = require('./routes.js');

// Set port
app.set('port', process.env.PORT || 3000);

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Routes
app.use('/', router);

// Static Files
app.use(express.static(`${__dirname}/../client/dist`));

// Init server
app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
