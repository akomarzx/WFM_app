const getDashboard = function(req, res) {
  res.render('./dashboardViews/index');
};

const getRolesPermissionsDashboard = function(req, res) {
  res.status(200).render('./dashboardViews/rolesPermissionDashboard.ejs');
};

const getDepartmentDashboard = function(req, res) {
  res.status(200).render('./dashboardViews/departmentDashboard');
};

const getPositionsDashboard = function(req, res) {
  res.status(200).render('./dashboardViews/positionDashboard');
};

module.exports = {
  getDashboard,
  getRolesPermissionsDashboard,
  getDepartmentDashboard,
  getPositionsDashboard,
};
