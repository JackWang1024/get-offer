exports.get = function(app) {
  function get(req, res) {
    res.json({
      user_name: req.session.user_name || '小透明',
      user_email: req.session.user_email || ''
    });
  }

  return get;
};