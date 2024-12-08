
const autoBind = require('auto-bind');
const { CerModel } = require('./cer.model');
const createHttpError = require("http-errors");

class CerService {

   async create(data) {
    try {
        const check=await CerModel.findOne({
            NationnalCode:data.nationnalcode
        });
        if(check){
          res.status(406).json(createHttpError.NotAcceptable('Error Cer is exist.'));
        }
      const cer = await CerModel.create({
        name: data.name,
        couresName: data.course,
        NationnalCode: data.nationnalcode,
        content: data.content,
        issueDate: data.issuedate,
        expiryDate: data.expirydate,
        issuingOrganization:"Darya-Teach"
      });
      return  cer.save();
    } catch (error) {
      console.log("header");
      
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

   async downloadCer(code) {
    try {
        if(!code && typeof(code)=='number' ){
            throw new createHttpError[403](' there is no Certification for this code meli');
        }
        const cer = await CerModel.findOne({
        NationnalCode:code
      },{
        content:1,
        name:1,
        couresName:1,
        _id:0,
        verificationUrl:1
      });
      if(!cer){
        throw new createHttpError[403](' there is no Certification for this code meli');
    }
    
    return cer;
       
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

   async getAll() {
    try {
      const cers = await CerModel.find({}).sort({ createdAt: -1},{limit:10});
      return cers;
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

   async getById(id) {
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

   async update(id, data) {
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

   async delete(id) {
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

module.exports = new CerService();
