'use strict';
const express = require('express');
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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/tasks', taskRouter);


app.listen(3000, _ => {
  console.log('Server is listening on port 3000');
});