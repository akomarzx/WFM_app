const Joi = require('joi')
    .extend(require('@joi/date'));

const employeeSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  birth_date: Joi.date().format('YYYY-MM-DD').utc().required(),
  sex: Joi.string().max(1).lowercase().valid('m', 'f', 'x').required(),
  employment_status: Joi.string().lowercase()
      .valid('active', 'inactive').required(),
}).required();

module.exports = {
  employeeSchema,
};
