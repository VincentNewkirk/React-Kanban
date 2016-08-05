'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const TaskSchema = new Schema({
  author: String,
  name: String,
  description: String,
  status: {type: String, default: 'to-do' },
  priority: String,
  assigned: String,
});

module.exports = mongoose.model('Tasks', TaskSchema);