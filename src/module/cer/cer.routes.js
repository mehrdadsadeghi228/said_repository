const express = require('express');
const router = express.Router();
const cerController = require('./cer.controller');
const { updateCertificationValidation, createCertificationValidation, deleteCertificationValidation, getCertificationValidation, getNationcodeCertificationValidation } = require('./cer.validate');

// Get all certificates
router.get('/', cerController.getAllCertifications);

// Get certificate by ID
//router.get('/:id', getCertificationValidation,cerController.getCertificationById);


// index page certificate
router.get('/create',cerController.EJScreateCertification);
router.post('/created/', createCertificationValidation,cerController.createCertification);

router.get('/test',cerController.test);

router.get('/dwonload',cerController.downloadCertificationEJS);
//router.post('/download/serach/', getNationcodeCertificationValidation,cerController.downloadCertification);
router.post('/download/serach/', getNationcodeCertificationValidation,cerController.downloadCertification2);


//router.get('/:id', getCertificationValidation,cerController.getCertificationById);

// Update certificate
router.put('/:id', updateCertificationValidation,cerController.updateCertification);

// Delete certificate
router.delete('/:id', deleteCertificationValidation,cerController.deleteCertification);

module.exports = {
    CerRoutes:router
};
