(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.hashbang = true;
  app.title = "面筋";

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function(e) {
    var navDrawer = document.querySelector('#navDrawerPanel');
    if (navDrawer.narrow) {
      navDrawer.closeDrawer();
    }

    var mainDrawer = document.querySelector('#mainDrawerPanel');
    if (e.detail.item.dataset.route === "node") {
      mainDrawer.openDrawer();
    } else {
      mainDrawer.closeDrawer();
    }
  };

  app._computeListWidth = function(isMobile) {
    // when in mobile screen size, make the list be 100% width to cover the whole screen
    return isMobile ? '100%' : '25%';
  };

  app.getPage = function() {
    if (app.hashbang) {
      return location.hash.replace('#!', '');
    } else {
      return location.pathname + location.search;
    }
  }

  app.onRefresh = function(e) {
    document.querySelector('topic-list').loadByName(app.node)
  }

  app.onAddTopic = function(e) {
    var mainDrawer = document.querySelector('#mainDrawerPanel');
    mainDrawer.closeDrawer();
    page('/topic/add');
    app.title = '发布新话题';
  }

  app.submitTopic = function(e) {
    var newTopic = {
      user_name: this.add_topic_user_name,
      user_email: this.add_topic_user_email,
      title: this.add_topic_title,
      content: this.add_topic_content,
      node_name: this.node
    }

    var that = this;

    var ajax = document.createElement('iron-ajax');
    ajax.url = '/api/topic'
    ajax.body = JSON.stringify(newTopic);
    ajax.method = 'POST';
    ajax.contentType="application/json";
    ajax.addEventListener('response', function() {
      var toast = document.createElement('paper-toast');
      toast.text = "提交成功！";
      app.appendChild(toast);
      toast.show();
      page('/node/' + newTopic.node_name);

      app.add_topic_user_name = "";
      app.add_topic_user_email = "";
      app.add_topic_title = "";
      app.add_topic_content = "";

      document.querySelector('topic-list').loadByName(newTopic.node_name);
    });
    ajax.generateRequest();

  }

  app.getNodeName = function(name) {
    var names = {
      'home': '首页',
      'preparation': '面试准备',
      'process': '面试中',
      'wait': '等待结果',
      'experience': '经验之谈',
      'gossip': '爆料吐槽',
      'hot': '热门'
    }

    return names[name];
  }

  app.onGetNode = function(e) {
    console.log(e.detail.response);
  }

})(document);