(function () {
  Polymer({
    is: 'topic-list',
    properties: {
      topics: {
        type: Array,
        notify: true,
      },
      node: {
        type: String,
        notify: true
      },
      nodeResponse: {
        type: Object,
        notify: true
      }
    },
    ready: function() {
      // this should be ajax
      // this.load('home');
    },
    load: function(node_name) {
      this.$.topicAjax.url = '/api/node/' + node_name;
    },
    path: function(value) {
      return '/topic/' + value;
    },
    _listTap: function(e) {
      page(this.path(e.detail.item.topicId));
      document.querySelector('topic-page').load(e.detail.item.topicData);
      document.querySelector('#mainDrawerPanel').closeDrawer();
    },
    onGetList: function(e) {
      if (e.detail.response)
        this.topics = e.detail.response.topics;
    }
  });
})();