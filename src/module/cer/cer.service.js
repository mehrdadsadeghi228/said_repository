
const CerModel = require('./cer.model');
const { BadRequestError } = require('../../common/errors');

class CerService {
  static async create(data) {
    try {
      const cer = await CerModel.create(data);
      return cer;
    } catch (error) {
      throw new BadRequestError('Failed to create certification');
    }
  }

  static async getAll() {
    try {
      const cers = await CerModel.find({}).sort({ createdAt: -1 });
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
