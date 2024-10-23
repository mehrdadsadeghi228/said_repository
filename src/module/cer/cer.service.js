
const { BadRequestError } = require('../../common/errors');
const { CerModel } = require('./cer.model');

class CerService {
    
  static async create(data) {
    try {
        const check=await CerModel.findOne({
            NationnalCode:data.NationnalCode
        })
        if(check){
            throw new BadRequestError('Certification already exists for this code meli');
        }
      const cer = await CerModel.create(data);
      return cer;
    } catch (error) {
      throw new BadRequestError('Failed to create certification');
    }
  }

   async downloadCer(code) {
    try {

        const cer = await CerModel.findOne({
        NationnalCode:code
      });
      if(!cer){
        throw new BadRequestError(' there is no Certification for this code meli');
    }
          // Render the certificate EJS template
      return res.render('certificate', { cer}, (err, html) => {
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
    } catch (error) {
      throw new BadRequestError('Failed to download  certification');
    }
  }

  static async getAll() {
    try {
      const cers = await CerModel.find({}).sort({ createdAt: -1},{limit:10});
      return cers;
    } catch (error) {
      throw new BadRequestError('Failed to fetch certifications');
    }
  }

  static async getById(id) {
    try {
      const cer = await CerModel.findById(id);
      if (!cer) {
        throw new BadRequestError('Certification not found');
      }
      return cer;
    } catch (error) {
      throw new BadRequestError('Failed to fetch certification');
    }
  }

  static async update(id, data) {
    try {
      const cer = await CerModel.findByIdAndUpdate(id, data, { new: true });
      if (!cer) {
        throw new BadRequestError('Certification not found');
      }
      return cer;
    } catch (error) {
      throw new BadRequestError('Failed to update certification');
    }
  }

  static async delete(id) {
    try {
      const cer = await CerModel.findByIdAndDelete(id);
      if (!cer) {
        throw new BadRequestError('Certification not found');
      }
      return cer;
    } catch (error) {
      throw new BadRequestError('Failed to delete certification');
    }
  }
}

module.exports = CerService;
