'use strict';
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kanban');
const db = mongoose.connection;
const taskRouter = require('./routes/taskRouter');
const bodyParser = require('body-parser');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

var env = process.env.NODE_ENV || 'development';
//var config;

if ( process.env.NODE_ENV == 'production' ) {
  config = {
    'username': process.env.USERNAME,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
    'host': process.env.HOST,
    'dialect': 'postgres'
  };
} else {
  const webpackDevMiddleware = require('webpack-dev-middleware')[env];
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.listen(3000, _ => {
  console.log('Server is listening on port 3000');
});