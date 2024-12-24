
const CerService = require('./cer.service');
const { StatusCodes } = require('http-status-codes');
const {logger} = require('../../utills/log/winston.config');
const { HttpStatusCode } = require('axios');
const { validationResult } = require('express-validator');
class CerController {
  
    async EJScreateCertification(req,res){
        try {            
         res.render('create-cer.ejs')
        } catch (error) {
            logger.error('error for faild in EJScreateCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
        }
    }
    async createCertification(req, res) {
        try {
            const errorValidator = validationResult(req);
            if (!errorValidator) {
                logger.log('info', "error for faild in validateAuthRegisterschema \'"+error+"\'");
                return res.status(HttpStatusCode.NotAcceptable).json({
                    statusCodes: HttpStatusCode.NotAcceptable,
                    message: errorValidator
                });   
            }
        await CerService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            statusCodes:StatusCodes.CREATED, 
            message:'Certification created successfully'
        });
        } catch (error) {
            logger.error('error for faild in createCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
            }
    }
        
    async downloadCertification(req, res) {
        try {
            const errorValidator = validationResult(req);
            if (!errorValidator) {
                logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
                return res.status(HttpStatusCode.NotAcceptable).json({
                    statusCodes: HttpStatusCode.NotAcceptable,
                    message: errorValidator
                });
            }
            const {code} =req.body
            
           const cer= await CerService.downloadCer(code);
                  
             return res.render("certificate.ejs",{cer});
          
             
      
        } catch (error) {
            logger.log('error for faild in  dwonload downloadCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
            }
    }


    /** ------------------------- do not yet code down -------------------------------------- */
  async getAllCertifications(req, res) {
    try {
      //const result = await this.#cerService.getAllCertifications();
      logger.error('error for faild in getAllCertifications'+error +error.stack);
      return res.status(StatusCodes.OK).json({
          statusCodes:StatusCodes.OK, 
          message:'All Certifications retrieved successfully'
        });
    } catch (error) {
        logger.log('error',' for faild in  dwonload getAllCertifications'+error +error.stack);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getCertificationById(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.info("error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotAcceptable).json({
                statusCodes: HttpStatusCode.NotAcceptable,
                message: errorValidator
            });   
        }
        //const result = await this.#cerService.getCertificationById(req.params.id);
        return handleResponse(res, StatusCodes.OK, 'Certification retrieved successfully', result);
    } catch (error) {
        logger.error('error for faild in getCertificationById',error +error.stack);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async updateCertification(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotAcceptable).json({
                statusCodes: HttpStatusCode.NotAcceptable,
                message: errorValidator
            });   
        }
        
        //const result = await this.#cerService.updateCertification(req.params.id, req.body);
        return handleResponse(res, StatusCodes.OK, 'Certification updated successfully', result);
    } catch (error) {

        logger.error('error for faild in updateCertification',error +error.stack);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async deleteCertification(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('info', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotAcceptable).json({
                statusCodes: HttpStatusCode.NotAcceptable,
                message: errorValidator
            });   
        }
        
        //await this.#cerService.deleteCertification(req.params.id);
        return handleResponse(res, StatusCodes.OK, 'Certification deleted successfully');
    } catch (error) {
        logger.error('error for faild in deleteCertification',error +error.stack);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new CerController();
