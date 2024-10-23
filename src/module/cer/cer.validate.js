const { body, param } = require('express-validator')

const createCertificationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('validityPeriod').isNumeric().withMessage('Validity period must be a number'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
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
  param('code').isNumeric().trim().withMessage('Invalid National code ')
]

module.exports = {
  createCertificationValidation,
  updateCertificationValidation,
  deleteCertificationValidation,
  getCertificationValidation,
  getNationcodeCertificationValidation
}
