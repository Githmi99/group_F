const statsController = require('../controllers/statsController');
const BoM = require('../models/BoM');
const Component = require('../models/component');
const Purchase = require('../models/Purchase');

jest.mock('../models/BoM');
jest.mock('../models/component');
jest.mock('../models/Purchase');

describe('Stats Controller', () => {
  describe('getStats', () => {
    it('should return aggregated stats', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      BoM.countDocuments.mockResolvedValue(10);
      Purchase.countDocuments.mockResolvedValue(20);
      Component.countDocuments.mockResolvedValue(15);

      await statsController.getStats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalBoMOrders: 10,
        totalPurchases: 20,
        totalComponents: 15,
      });
    });
  });

//   describe('getLatestComponents', () => {
//     it('should return latest added components', async () => {
//       const req = {};
//       const res = {
//         status: jest.fn().mockReturnThis(), // Allows chaining .status().json()
//         json: jest.fn()
//       };

//       // Mocking the Component.find method to return expected data
//       const mockComponents = [{ partNo: 'ABC123', product: 'Test Product', qty: 10 }];
//       Component.find.mockResolvedValue(mockComponents);

//       // Call the controller function
//       await statsController.getLatestComponents(req, res);

//       // Assertions
//       expect(res.status).toHaveBeenCalledWith(200); // Ensure status 200 is returned
//       expect(res.json).toHaveBeenCalledWith(mockComponents); // Ensure the correct data is returned in JSON
//     });
// });
});
