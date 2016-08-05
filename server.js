'use strict';

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const mongoose = require('mongoose');
mongoose.connect('mongodb://vincent:password@ds145405.mlab.com:45405/heroku_bb2qg2bt');
const db = mongoose.connection;
const taskRouter = require('./routes/taskRouter');
const bodyParser = require('body-parser');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}



app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

const onStart = (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`
  );
};

app.listen(process.env.PORT, 'localhost', onStart);

module.exports = app;

/*'use strict';
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
});*/