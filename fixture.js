/**
 * Models
 */
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var Node = require("./models/node");
var Topic = require("./models/topic");
var Reply = require("./models/reply");

/**
 * Mock data
 */

var nodes = [{
  name: 'preparation'
}, {
  name: 'process'
}, {
  name: 'wait'
}, {
  name: 'experience'
}, {
  name: 'gossip'
}];

var topics = [{
  "title": "终于集齐BAT，分享完面筋我就去召唤神龙",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "神龙在哪",
  "user_email": "foo@outlook.com",
  "node_name": "experience",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 8
},
{
  "title": "已集齐FLAG，你们有什么要问的",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "呵呵",
  "user_email": "bar@163.com",
  "node_name": "experience",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 13
},
{
  "title": "专注C艹三十年不动摇哈哈哈",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "C艹",
  "user_email": "44yo@outlook.com",
  "node_name": "experience",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 5
},
{
  "title": "等H1B中，来分享一下自己的面筋",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "小透明",
  "user_email": "baz@126.com",
  "node_name": "experiece",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 6
},
{
  "title": "租房好难啊",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "小透明",
  "user_email": "baz@126.com",
  "node_name": "gossip",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 6
}, {
  "title": "怎么阿里的内推系统看不到进度",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "小透明",
  "user_email": "baz@126.com",
  "node_name": "wait",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 6
}, {
  "title": "等待 offer 的日子里我都在干吗",
  "content": "其实一开始让我来讲，我是拒绝的",
  "user_name": "小透明",
  "user_email": "baz@126.com",
  "node_name": "process",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 6
},
{
  "title": "蛤蛤蛤蛤",
  "content": "你们啊，还是图样",
  "user_name": "蛤丝1号",
  "user_email": "haha@163.com",
  "node_name": "experience",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 5
}, {
  "title": "yooooooooooo",
  "content": "要提高自己的姿势水平",
  "user_name": "蛤丝2号",
  "user_email": "haha2@163.com",
  "node_name": "preparation",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 0
}, {
  "title": "[交流|求助]指点迷津",
  "content": "还是自己纠结吧 ",
  "user_name": "蛤丝5号",
  "user_email": "haha5@163.com",
  "node_name": "wait",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 0
},{
  "title": "[深夜福利]面试技巧一谈",
  "content": "技巧就是没技巧",
  "user_name": "蛤丝8号",
  "user_email": "haha8@163.com",
  "node_name": "experience",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 0
},{
  "title": "[晒命不要钱]blablabla",
  "content": "我拿到了BAT的offer,爽爽爽",
  "user_name": "蛤丝终极形态",
  "user_email": "hahafinal@163.com",
  "node_name": "gossip",
  "post_date": new Date(),
  "last_update": new Date(),
  "reply_count": 100
}
];

var replies = [{
  "content" : "666666666666",
  "user_name" : "小透明",
  "user_email" : "yooo@342.com",
  "post_date" : new Date()
},
{
  "content" : "无图无真相",
  "user_name" : "小透明",
  "user_email" : "yooo@342.com",
  "post_date" : new Date()
},
{
  "content" : "上 GitHub",
  "user_name" : "蛤蛤",
  "user_email" : "yooo@342.com",
  "post_date" : new Date()
},
{
  "content" : "才不要",
  "user_name" : "我是楼主",
  "user_email" : "yooo@342.com",
  "post_date" : new Date()
}];

/**
 * Reset the database
 */
Node.remove().exec()
  .then(function() {
    return Topic.remove().exec();
  }).then(function() {
    return Reply.remove().exec();
  }).then(function() {
    return Node.create(nodes);
  }).then(function() {
    return Topic.create(topics);
  }).then(function(topics) {
    for (var i = 0; i < replies.length; ++i) {
      replies[i].topic_id = topics[0]._id;
    }

    return Reply.create(replies);
  }).then(function() {
    console.log('The database has been reset,' +
      ' enter ctrl-c to exit');
    return true;
  }).then(undefined, function(err) {
    console.log(err);
    return true;
  });
