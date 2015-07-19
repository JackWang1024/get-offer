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
TopicSchema.methods.update = function updateCount (cb) {
  var that = this;
  return Reply.find({topic_id: that._id})
              .sort({ post_date: -1 })
              .exec()
              .then(function(replies) {
                that.reply_count = replies.length;
                that.last_update = replies[0].post_date;
                that.save(cb);
              });
};

var Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;