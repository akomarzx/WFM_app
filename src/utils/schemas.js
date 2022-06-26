const sanitizeHtml = require('sanitize-html');

const BaseJoi = require('joi')
    .extend(require('@joi/date'));

const htmlSanitizerExtension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML tags',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', {value});
        return clean;
      },
    },
  },

});

const Joi = BaseJoi.extend(htmlSanitizerExtension);

const employeeSchema = Joi.object({
  first_name: Joi.string().required().escapeHTML(),
  last_name: Joi.string().required(),
  birth_date: Joi.date().format('YYYY-MM-DD').utc().required(),
  sex: Joi.string().max(1).lowercase().valid('m', 'f', 'x').required(),
  employment_status: Joi.string().lowercase()
      .valid('active', 'inactive').required(),
}).required();

module.exports = {employeeSchema};

