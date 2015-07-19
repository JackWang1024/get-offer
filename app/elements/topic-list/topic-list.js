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
        notify: true,
        observer: 'nodeChanged'
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
    nodeChanged: function() {
      console.log('node changed to', this.node);
      this.loadByName(this.node);
    },
    loadByName: function(node_name) {
      this.$.topicAjax.url = '/api/node/' + node_name;
      this.$.topicAjax.generateRequest();
    },
    path: function(value) {
      return '/topic/' + value;
    },
    _listTap: function(e) {
      page(this.path(e.detail.item.topicId));
      document.querySelector('#mainDrawerPanel').closeDrawer();
    },
    onGetList: function(e) {
      if (e.detail.response) {
        //
      }
    }
  });
})();