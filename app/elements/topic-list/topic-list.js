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
      console.log('selected');
      // var drawer = document.querySelector('#mainDrawerPanel');
      // if (drawer.narrow)
      //   drawer.closeDrawer();
      // page(this.path(e.detail.item.topicId));
    },
    onGetList: function(e) {
      if (e.detail.response) {
        //
      }
    },
    _onActivate: function() {
      console.log('activated');
    },
    _onClick: function(e) {
      console.log('clicked');
      var drawer = document.querySelector('#mainDrawerPanel');
      if (drawer.narrow)
        drawer.closeDrawer();
      var item = this._parent(e.target, 'TOPIC-ITEM');
      page(this.path(item.topicId));
      console.log();
    },
    _parent: function(node, tag) {
      if (node.nodeName === tag) return node;
      while (node.parentNode !== document.body) {
        if (node.parentNode.nodeName === tag) {
          return node.parentNode;
        }
        node = node.parentNode;
      }
      return null;
    }
  });
})();