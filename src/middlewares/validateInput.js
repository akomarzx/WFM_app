const {ValidationError} = require('joi');
const ApiError = require('../utils/apiError');

module.exports = function Validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error) {
      next(new ApiError(error.message, 400, false));
    }
  };
};
