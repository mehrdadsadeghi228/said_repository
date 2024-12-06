
const { CerModel } = require('./cer.model');
const createHttpError = require("http-errors");

class CerService {
    
  static async create(data) {
    try {
        const check=await CerModel.findOne({
            NationnalCode:data.NationnalCode
        });
        if(check){
          res.status(406).json(createHttpError.NotAcceptable('Error Cer is exist.'));
        }
      const cer = await CerModel.create({
        name: data.name,
        NationnalCode: data.NationnalCode,
        subCouresName: data.subCouresName,
        issueDate: data.issueDate,
        expiryDate: data.expiryDate,
        issuingOrganization:"Darya-Teach"
      });
      return cer;
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

   async downloadCer(code) {
    try {

        const cer = await CerModel.findOne({
        NationnalCode:code
      });
      if(!cer){
        throw new createHttpError.BadRequestError(' there is no Certification for this code meli');
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
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getAll() {
    try {
      const cers = await CerModel.find({}).sort({ createdAt: -1},{limit:10});
      return cers;
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async getById(id) {
    try {
      const cer = await CerModel.findById(id);
      if (!cer) {
        throw new createHttpError.BadRequestError('Certification not found');
      }
      return cer;
    } catch (error) {
      res.status(500).json({ message: 'Server error Failed to fetch certification', error: error.message });
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
      res.status(500).json({ message: 'Server error Failed to update certification', error: error.message });
    }
  }

  static async delete(id) {
    try {
      const cer = await CerModel.findByIdAndDelete(id);
      if (!cer) {
        res.status(500).json({ message: 'Not Found !', error: error.message });
      }
      return cer;
    } catch (error) {
      res.status(500).json({ message: 'Server error Failed to delete certification', error: error.message });
    }
  }
}

module.exports = CerService;
