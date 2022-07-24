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
  firstName: Joi.string().escapeHTML().required(),
  lastName: Joi.string().escapeHTML().required(),
  birthDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  sex: Joi.string().
      uppercase().valid('MALE', 'FEMALE', 'X').
      escapeHTML().required(),
  employmentStatus: Joi.string().uppercase()
      .valid('ACTIVE', 'INACTIVE').escapeHTML().required(),
}).required();

const logInSchema = Joi.object({
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .escapeHTML()
      .required(),
  password: Joi.string().
      required(),
}).required();

const registrationSchema = Joi.object({
  regCode: Joi.string()
      .escapeHTML()
      .required(),
  email: Joi.string()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
      .escapeHTML()
      .required(),
  password: Joi.string()
      // eslint-disable-next-line max-len
      .pattern(new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9!@#\$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}/))
      .messages({
        'string.pattern.base': 'Invalid Password',
      }),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

const roleSchema = Joi.object({
  roleName: Joi.string()
      .min(3)
      .escapeHTML()
      .required(),
});

const permissionSchema = Joi.object({
  permissionName: Joi.string()
      .min(5)
      .escapeHTML()
      .required(),
});

module.exports = {
  employeeSchema,
  logInSchema,
  permissionSchema,
  registrationSchema,
  roleSchema,
};

