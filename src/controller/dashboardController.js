const getDashboard = function(req, res) {
  res.render('./dashboardViews/index');
};
const getRolesPermissionsDashboard = function(req, res) {
  res.status(200).render('./dashboardViews/rolesPermissionDashboard.ejs');
};

module.exports = {
  getDashboard,
  getRolesPermissionsDashboard,
};
