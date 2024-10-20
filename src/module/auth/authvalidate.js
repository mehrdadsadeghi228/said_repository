
const Joi = require('joi');

  const validateAuthRegisterschema = Joi.object({
    username: Joi.string().pattern(new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required()
  });

  const validateAuthLoginschema = Joi.object({
    username: Joi.string().pattern(new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });


module.exports = {
    validateAuthRegisterschema,
    validateAuthLoginschema
};
