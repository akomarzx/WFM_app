const ApiError = require('../utils/apiError');
module.exports = function isRoleAllowed(roleRequired) {
  return async (req, res, next) => {
    try {
      if (req.user.Role.roleName === roleRequired) {
        next();
      } else {
        throw new ApiError('Not Authorized', 403, false);
      }
    } catch (error) {
      next(error);
    };
  };
};
