(function () {
  Polymer({
    is: 'topic-page',
    properties: {
      title: {
        type: String,
        notify: true,
      },
      lastUpdate: {
        type: Date,
        notify: true
      },
      topicId: {
        type: String,
        notify: true
      },
      replies: {
        type: Array,
        notify: true
      }
    },
    ready: function() {
      // this should be ajax
      this.load('');
    },
    load: function(topicId) {
      if (!topicId) return;
      
      // should have been ajax here
      this.title = '你们都弱爆了，我已经集齐FLAG+BAT';
      this.topicId = topicId;
      this.lastUpdate = new Date();
      this.replies = ['1', '2', '3', '4'];
    }
  });
})();