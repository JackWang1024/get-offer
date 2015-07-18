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
    }
  });
})();