const { body, param } = require('express-validator')

const createCertificationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('course').notEmpty().withMessage('course is required'),
  body('nationnalcode').isNumeric().withMessage(' nationnalcode must be a number'),
  body('content').isString().withMessage('content must be a string'),
  body('issuedate').isDate().withMessage('issuedate must be a date'),
  body('expirydate').isDate().withMessage('expirydate must be a date'),
]
const updateCertificationValidation = [
  param('id').isMongoId().withMessage('Invalid certification ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('validityPeriod').optional().isNumeric().withMessage('Validity period must be a number'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
]
const deleteCertificationValidation = [
  param('id').isMongoId().withMessage('Invalid certification ID')
]
const getCertificationValidation = [
  param('id').isMongoId().withMessage('Invalid certification ID')
]
const getNationcodeCertificationValidation = [
  body('code').isNumeric().trim().withMessage('Invalid National code ')
]

module.exports = {
  createCertificationValidation,
  updateCertificationValidation,
  deleteCertificationValidation,
  getCertificationValidation,
  getNationcodeCertificationValidation
}
