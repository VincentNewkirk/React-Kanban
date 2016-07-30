const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const TaskSchema = new Schema({
  author: String,
  name: String,
  description: String,
  date: {type: Date, default: Date.now},
  status: {type: String, default: 'to-do' }
});


module.exports = mongoose.model('Tasks', TaskSchema);