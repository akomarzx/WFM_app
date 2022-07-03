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
  first_name: Joi.string().escapeHTML().required(),
  last_name: Joi.string().escapeHTML().required(),
  birth_date: Joi.date().format('YYYY-MM-DD').utc().required(),
  sex: Joi.string().max(1).
      lowercase().valid('m', 'f', 'x').
      escapeHTML().required(),
  employment_status: Joi.string().lowercase()
      .valid('active', 'inactive').escapeHTML().required(),
}).required();

const logInSchema = Joi.object({
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .escapeHTML()
      .required(),
  password: Joi.string().
      required(),
}).required();


// TODO: Registration Schema - A little bit complicated
// need more time
// eslint-disable-next-line max-len
//     .pattern(new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9!@#\$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}/))
//     .messages({
//       'string.pattern.base': 'Invalid Password',
//     }),
module.exports = {employeeSchema, logInSchema};

