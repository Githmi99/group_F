const componentRequestController = require('../controllers/componentRequestController');
const ComponentRequest = require('../models/ComponentRequest');
const Component = require('../models/component');

jest.mock('../models/ComponentRequest');
jest.mock('../models/component');

describe('Component Request Controller', () => {
  describe('createRequest', () => {
    it('should create a new component request', async () => {
      const req = { body: { partNo: 'ABC123', quantity: 5, dateOfNeed: '2023-10-15', userId: 'user123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await componentRequestController.createRequest(req, res);

      expect(ComponentRequest).toHaveBeenCalledWith(expect.objectContaining({
        partNo: 'ABC123',
        quantity: 5,
        dateOfNeed: '2023-10-15',
        userId: 'user123',
      }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Request created successfully' }));
    });
  });
  
  describe('updateRequestStatus', () => {
    it('should update the status and stock if issued', async () => {
      const req = { params: { id: '123' }, body: { status: 'Issued' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      ComponentRequest.findById.mockResolvedValue({ partNo: 'ABC123', quantity: 5, save: jest.fn() });
      Component.findOne.mockResolvedValue({ partNo: 'ABC123', qty: 10, save: jest.fn() });

      await componentRequestController.updateRequestStatus(req, res);

      expect(Component.findOne).toHaveBeenCalledWith({ partNo: 'ABC123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Request status updated' }));
    });
  });
});
