const ApiError = require('../utils/apiError');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  next(new ApiError('Unauthenticad User', 403, false));
};

module.exports = isLoggedIn;
