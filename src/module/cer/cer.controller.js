
const CerService = require('./cer.service');
const { StatusCodes } = require('http-status-codes');
const {logger} = require('../../utills/log/winston.config');
const { HttpStatusCode } = require('axios');
const pdf = require('html-pdf');
const ejs = require("ejs");
const path=require("path");
const { validationResult } = require('express-validator');
const puppeteer=require("puppeteer")

class CerController {
  

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
        console.log(req.body);

      const data=  {
                name: 'mehrdad',
                course: 'fuckitup',
                nationnalcode: '256566589',
                content: 'cvv.pfkrtjrtj8trj',
                issuedate: '2024-12-25',
                expirydate: '2024-12-18'
                };
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
    async EJScreateCertification(req,res){
        try {            
         res.render('create-cer.ejs')
        } catch (error) {
            logger.error('error for faild in EJScreateCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });

        }
    }
    async test(req,res){
        try {            
         res.render('v2-cer.ejs')
        } catch (error) {
            logger.error('error for faild in EJScreateCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });

        }
    }
    async downloadCertificationEJS(req, res) {
            try {            
                res.render('download-cer.ejs')
               } catch (error) {
                   logger.error('error for faild in downloadCertificationEJS',error +error.stack);
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
            console.log(code);
            
           const cer= await CerService.downloadCer(code);
           console.log(cer);
           const html = await ejs.renderFile(path.join( './views/', 'certificate.ejs'), {
          cer
          });
        
          // Launch Puppeteer to create the PDF
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.setContent(html, { waitUntil: 'domcontentloaded' });
        
          // Create PDF
          const pdfBuffer = await page.pdf({ format: 'A4' });
        
          await browser.close();
        
          // Send the PDF as a download
          res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="generated.pdf"',
          });
          res.send(pdfBuffer);
        
        
            // Render the certificate EJS template
           /**
            *  return res.render('certificate.ejs', { cer}, (err, html) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Something went wrong.');
                } else {
                    // Convert the HTML to PDF
                    const options = { format: 'Letter' };
                    pdf.create(html, options).toBuffer((err, buffer) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Error generating PDF.');
                        } else {
                            // Set the headers and send the PDF
                            res.writeHead(200, {
                                'Content-Type': 'application/pdf',
                                'Content-Disposition': 'attachment; filename=certificate.pdf',
                            });
                            res.end(buffer);
                        }
                    });
                }
            });
            */
        } catch (error) {
            logger.log('error for faild in  dwonload downloadCertification',error +error.stack);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
            }
    }
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
