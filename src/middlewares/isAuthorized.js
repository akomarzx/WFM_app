const {Role, Permission} = require('../models');
const ApiError = require('../utils/apiError');
module.exports = function isAuthorized(permissionRequired) {
  return async (req, res, next) => {
    try {
      const result = await Role.findOne({
        where: {
          roleId: req.user.roleId,
        },
        include: Permission,
      });
      if (result.Permissions.some((element) =>
        element.permissionName === permissionRequired)) {
        return next();
      }
      throw new ApiError('Not Authorized', 403, false);
    } catch (error) {
      next(error);
    };
  };
};
