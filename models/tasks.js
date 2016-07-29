const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const TaskSchema = new Schema({
  author: String,
  name: String,
  description: String,
});


module.exports = mongoose.model('Tasks', TaskSchema);