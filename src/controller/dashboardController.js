const getDashboard = function(req, res) {
  res.locals.employee = req.user;
  res.render('./dashboardViews/index');
};

module.exports = {
  getDashboard,
};
