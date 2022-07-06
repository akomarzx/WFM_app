const getDashboard = function(req, res) {
  res.locals.employee = req.user;
  res.render('./dashboardViews/index');
};
const getRolesPermissionsDashboard = function(req, res) {
  res.send('Roles and permission dashboard');
};

module.exports = {
  getDashboard,
  getRolesPermissionsDashboard,
};
