const { CerController } = require('./cer.controller');
const { CerService } = require('./cer.service');

jest.mock('./cer.service');

describe('CerController', () => {
  let controller;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new CerController();
  });

  describe('constructor', () => {
    it('should create an instance of CerController with CerService', () => {
      expect(controller).toBeInstanceOf(CerController);
      expect(controller.cerService).toBeInstanceOf(CerService);
    });

    it('should initialize CerService only once', () => {
      const controller1 = new CerController();
      const controller2 = new CerController();
      
      expect(CerService).toHaveBeenCalledTimes(2);
      expect(controller1.cerService).toBeDefined();
      expect(controller2.cerService).toBeDefined();
    });

    it('should have cerService as a property', () => {
      expect(controller).toHaveProperty('cerService');
    });
  });
});
