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

    if (e.detail.item.dataset.route === "node") {
      var mainDrawer = document.querySelector('#mainDrawerPanel');
      mainDrawer.openDrawer();
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
    console.log(e.detail);
    console.log('refresh!');
    console.log(this.node, this.topic);
  }

  app.onAddTopic = function(e) {
    console.log(e.detail);
    console.log(this.node, this.topic);
    console.log('add!!');
    page('/topic/add');
  }

  app.getNodeName = function(name) {
    var names = {
      'home': '首页',
      'preparation': '面试准备',
      'process': '面试中',
      'wait': '等待结果',
      'experience': '经验之谈',
      'gossip': '爆料吐槽'
    }

    return names[name];
  }

})(document);