
const {body}=require("express-validator");

  const validateAuthRegisterschema = [
    body('username').notEmpty().trim().isString().matches('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),
    body('password').notEmpty().isString().matches('^[a-zA-Z0-9]{3,30}$'),
    body('email').notEmpty().isString().isEmail()
    ]
  const validateAuthLoginschema = [
    body('email').notEmpty().isString().isEmail(),
    body('password').notEmpty().isString().matches('^[a-zA-Z0-9]{3,30}$')
    ]

module.exports = {
    validateAuthRegisterschema,
    validateAuthLoginschema
};
