const express = require('express');
const router = express.Router();
const {  createCertificationValidation, getNationcodeCertificationValidation } = require('./cer.validate');
const cerController = require('./cer.controller');

// Get all certificates
//router.get('/', cerController.getAllCertifications);


// index page certificate
router.get('/create',cerController.EJScreateCertification);
router.post('/created/', createCertificationValidation,cerController.createCertification);
router.get('/download/', getNationcodeCertificationValidation,cerController.downloadCertification);


//router.get('/:id', getCertificationValidation,cerController.getCertificationById);

// Update certificate
//router.put('/:id', updateCertificationValidation,cerController.updateCertification);

// Delete certificate
//router.delete('/:id', deleteCertificationValidation,cerController.deleteCertification);

module.exports = {
    CerRoutes:router
};
