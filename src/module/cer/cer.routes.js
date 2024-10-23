const express = require('express');
const router = express.Router();
const cerController = require('./cer.controller');
const { updateCertificationValidation, createCertificationValidation, deleteCertificationValidation, getCertificationValidation } = require('./cer.validate');

// Get all certificates
router.get('/', cerController.getAllCertifications);

// Get certificate by ID
router.get('/:id', getCertificationValidation,cerController.getCertificationById);

router.get('download/:id', getNationcodeCertificationValidation,cerController.downloadCertification);

// Create new certificate
router.get('index/', createCertificationValidation,cerController.createCertification);

router.post('index/', createCertificationValidation,cerController.createCertification);

// Update certificate
router.put('/:id', updateCertificationValidation,cerController.updateCertification);

// Delete certificate
router.delete('/:id', deleteCertificationValidation,cerController.deleteCertification);

module.exports = router;
