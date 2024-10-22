const purchaseController = require('../controllers/purchaseController');
const Purchase = require('../models/Purchase');

jest.mock('../models/Purchase');

describe('Purchase Controller', () => {
  describe('getPurchases', () => {
    it('should return all purchases', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Purchase.find.mockResolvedValue([{ orderID: '123', product: 'Laptop', quantity: 1 }]);

      await purchaseController.getPurchases(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ orderID: '123', product: 'Laptop', quantity: 1 }]);
    });
  });

  describe('addPurchase', () => {
    it('should add a new purchase', async () => {
      const req = { body: { product: 'Laptop', quantity: 1, cost: 1000, date: '2023-10-15', status: 'Paid' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const saveMock = jest.fn();
      Purchase.mockImplementation(() => ({ save: saveMock }));

      await purchaseController.addPurchase(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
