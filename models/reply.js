var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate');

var ReplySchema = new Schema({
  content: String
  user_name: String
  user_email: String,
  topic_id: Schema.Types.ObjectId,
  post_date: Date
});

ReplySchema.plugin(paginate);
module.exports = mongoose.model('Reply', ReplySchema);