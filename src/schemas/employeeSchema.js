const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports = Joi.object({
  employee: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  }),
}).required();
