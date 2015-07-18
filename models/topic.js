var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate');
var Reply = require('./reply');

var TopicSchema = new Schema({
  title: String,
  content: String,
  user_name: String,
  user_email: String,
  node_name: String,
  post_date: Date,
  last_update: Date,
  reply_count: Number
});

TopicSchema.plugin(paginate);
TopicSchema.methods.updateCount = function updateCount (cb) {
  return Reply.find({ topic_id: this._id }, function(err, replies) {
    this.reply_count = replies.length;
    this.save(cb);
  });
};

var Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;