const ApiError = require('../utils/apiError');
module.exports = function isRoleAllowed(roleRequired) {
  return async (req, res, next) => {
    console.log(req.user.Role.role_name);
    try {
      if (req.user.Role.role_name === roleRequired) {
        next();
      } else {
        throw new ApiError('Not Authorized', 403, false);
      }
    } catch (error) {
      next(error);
    };
  };
};
