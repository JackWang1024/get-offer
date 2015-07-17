var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Node', NodeSchema);