
const CerService = require('./cer.service');
const { handleResponse } = require('../../shared/helpers/response.helper');
const { StatusCodes } = require('http-status-codes');
const logger = require('../../utills/log/winston.config');
const { httpStatusCode } = require('httpstatuscode');

class CerController {
    #cerService
    constructor() {
    this.#cerService = new CerService();
  }

  async createCertification(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: httpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
        
      const result = await this.#cerService.createCertification(req.body);
      return handleResponse(res, StatusCodes.CREATED, 'Certification created successfully', result);
    } catch (error) {
         logger('error for faild in createCertification',error +error.stack);
         return handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async getAllCertifications(req, res) {
    try {
      
      const result = await this.#cerService.getAllCertifications();
      return handleResponse(res, StatusCodes.OK, 'Certifications retrieved successfully', result);
    } catch (error) {
      
        logger('error for faild in getAllCertifications',error +error.stack);
        return handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async getCertificationById(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: HttpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
        
      const result = await this.#cerService.getCertificationById(req.params.id);
      return handleResponse(res, StatusCodes.OK, 'Certification retrieved successfully', result);
    } catch (error) {

        logger('error for faild in getCertificationById',error +error.stack);
        return handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async updateCertification(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: HttpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
        
      const result = await this.#cerService.updateCertification(req.params.id, req.body);
      return handleResponse(res, StatusCodes.OK, 'Certification updated successfully', result);
    } catch (error) {

        logger('error for faild in updateCertification',error +error.stack);
        return handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  async deleteCertification(req, res) {
    try {
        const errorValidator = validationResult(req);
        if (!errorValidator) {
            logger.log('error', "error for faild in validateAuthRegisterschema \'"+error+"\'");
            return res.status(HttpStatusCode.NotImplemented).json({
                statusCodes: HttpStatusCode.NotImplemented,
                message: errorValidator
            });   
        }
        
      await this.#cerService.deleteCertification(req.params.id);
      return handleResponse(res, StatusCodes.OK, 'Certification deleted successfully');
    } catch (error) {
        logger('error for faild in deleteCertification',error +error.stack);
        return handleResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}

module.exports = new CerController();
