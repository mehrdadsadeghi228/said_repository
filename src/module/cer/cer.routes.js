
const express = require('express');
const router = express.Router();
const cerController = require('./cer.controller');
const { updateCertificationValidation, createCertificationValidation, deleteCertificationValidation, getCertificationValidation } = require('./cer.validate');

// Get all certificates
router.get('/', createCertificationValidation,cerController.getAllCertifications);

// Get certificate by ID
router.get('/:id', getCertificationValidation,cerController.getCertificationById);

// Create new certificate
router.post('/', cerController.createCertification);

// Update certificate
router.put('/:id', updateCertificationValidation,cerController.updateCertification);

// Delete certificate
router.delete('/:id', deleteCertificationValidation,cerController.deleteCertification);

module.exports = router;
