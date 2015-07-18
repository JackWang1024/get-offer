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
      }
    },
    ready: function() {
      // this should be ajax
      console.log(this.dataset.node);
      this.load('home');
    },
    load: function(node_name) {
      if (node_name === "experience") {
        // should have been ajax here
        this.topics = ['1', '2', '3', '4'];
      } else {
        this.topics = ['12'];;
      }
    },
    path: function(value) {
      return '/topic/' + value;
    },
    _listTap: function(e) {
      page(this.path(this.topics[e.detail.selected].id));
      document.querySelector('#mainDrawerPanel').closeDrawer();
    }
  });
})();