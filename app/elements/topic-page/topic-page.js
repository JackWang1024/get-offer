(function () {
  Polymer({
    is: 'topic-page',
    properties: {
      topicId: {
        type: String,
        notify: true,
        observer: 'topicIdChanged'
      },
      topicResponse: {
        type: Object,
        notify: true
      },
      node: {
        type: String,
        notify: true
      },
      title: {
        type: String,
        notify: true
      },
      topicId: {
        type: String,
        notify: true
      },
      content: {
        type: String,
        notify: true
      },
      lastUpdate: {
        type: Date,
        notify: true
      },
      userName: {
        type: String,
        notify: true
      },
      userEmail: {
        type: String,
        notify: true
      },
      loading: {
        type: Boolean,
        notify: true,
        value: false
      }
    },
    ready: function() {
      // this should be ajax
      // this.load('');
    },
    getPath: function(id) {
      return '/api/topic/' + id;
    },
    topicIdChanged: function() {
      this.loadById(this.topicId);
    },
    load: function(data) {
      if (!data) {
        return;
      }
      // should have been ajax here
      this.title = data.title;
      this.topicId = data._id;
      this.content = data.content;
      document.querySelector('#topic-content').innerHTML = this.content;
      this.userName = data.user_name;
      this.userEmail = data.user_email;
      this.lastUpdate = new Date(data.last_update);
      this.node = data.node_name;
      app.node = app.node || data.node_name;
      app.title = this.title;
    },
    onGetTopic: function(e) {
      if (e.detail.response && e.detail.response.topic)
        this.load(e.detail.response.topic);
      this.loading = false;
    },
    mailHref: function(mail) {
      return 'mailto://' + mail;
    },
    loadById: function(id) {
      if (this.loading)  {
        return;
      }
      this.$.topicPageAjax.url = '/api/topic/' + id;
      this.$.topicPageAjax.generateRequest();
    },
    submitReply: function(e) {
      var newReply = {
        user_name: this.add_reply_user_name,
        user_email: this.add_reply_user_email,
        content: this.add_reply_content,
        topic_id: this.topicId
      }

      var that = this;

      var ajax = document.createElement('iron-ajax');
      ajax.url = '/api/reply'
      ajax.body = JSON.stringify(newReply);
      ajax.method = 'POST';
      ajax.contentType="application/json";
      ajax.addEventListener('response', function() {
        var toast = document.createElement('paper-toast');
        toast.text = "提交成功！";
        app.appendChild(toast);
        toast.show();

        that.add_reply_user_name = "";
        that.add_reply_user_email = "";
        that.add_reply_content = "";
        page('/topic/' + newReply.topic_id);
      });
      ajax.generateRequest();
    },
    formatDate: function(date) {
      var dict = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var c = date.toString().match(/\w+ (\w+) (\d+) (\d+) (\d+:\d+:\d+)/);
      var month = dict.indexOf(c[1]) + 1;
      return [c[3], month, c[2]].join('-') + ' ' + c[4];
    }
  });
})();