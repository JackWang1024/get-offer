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
      },
      userName : {
        type: String,
        notify: true
      },
      userEmail : {
        type: String,
        notify: true
      },
      content : {
        type: String,
        notify: true
      },
      node: {
        type: String,
        notify: true
      }
    },
    ready: function() {
      // this should be ajax
      // this.load('');
    },
    getPath: function(id) {
      return '/api/topic/' + id;
    },
    load: function(data) {
      if (!data) {
        return;
      }

      this.$.topicPageAjax.url = this.getPath(data._id);
      // should have been ajax here
      this.title = data.title;
      this.topicId = data._id;
      this.content = data.content;
      document.querySelector('#topic-content').innerHTML = this.content;
      this.userName = data.user_name;
      this.userEmail = data.user_email;
      this.lastUpdate = data.last_update;
      this.node = data.node_name;
      app.node = app.node || data.node_name;
      app.title = this.title;

      document.querySelector('topic-list').load(data.node_name);
    },
    onGetTopic: function(e) {
      if (e.detail.response)
        this.load(e.detail.response.topic);
    },
    mailHref: function(mail) {
      return 'mailto://' + mail;
    },
    loadById: function(id) {
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
        page('/topic/' + newReply.topic_id);
      });
      ajax.generateRequest();
    }
  });
})();