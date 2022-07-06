// TODO: attach the serialized employee the locals via a middleware

const getDashboard = function(req, res) {
  res.locals.employee = req.user;
  res.render('./dashboardViews/index');
};
const getRolesPermissionsDashboard = function(req, res) {
  res.status(200).render('./dashboardViews/rolesPermissionDashboard.ejs');
};

module.exports = {
  getDashboard,
  getRolesPermissionsDashboard,
};
