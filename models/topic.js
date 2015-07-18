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
  console.log(this._id);
  var that = this;
  return Reply.find({ topic_id: that._id }, function(err, replies) {
    that.reply_count = replies.length;
    console.log(that);
    that.save(cb);
  });
};

var Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;