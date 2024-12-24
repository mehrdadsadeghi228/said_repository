
const createHttpError = require("http-errors");
const { CerModel } = require("./cer.model");
class CerService {

   async create(data) {
    try {
      console.log("here");
      
      const check = await CerModel.findOne({
        NationnalCode:data.nationnalcode
    });
    console.log("here2");

    if(check){
      throw new createHttpError[406]('there was cer for this code meli');
    }
        console.log("here3");

        console.log(check);
        
      const cer = await CerModel.create({
        name: data.name,
        couresName: data.course,
        NationnalCode: data.nationnalcode,
        content: data.content,
        issueDate: data.issuedate,
        expiryDate: data.expirydate,
        issuingOrganization:"Darya-Teach"
      });
      console.log(cer);
      
      return cer;
    } catch (error) {
      throw new createHttpError[500]('Server error'+error);
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
    return cer;     
    } catch (error) {
      return{ message: 'Server error', error: error.message }
    }
  }
  
  /** ------------------------- do not yet code down -------------------------------------- */

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
