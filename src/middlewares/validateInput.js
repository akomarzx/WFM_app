module.exports = function Validate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnkown: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
