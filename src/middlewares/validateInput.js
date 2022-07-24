const {ValidationError} = require('joi');

module.exports = function Validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        req.flash('error', error.message);
        return res.redirect('back');
      }
      next(error);
    }
  };
};
