const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming app.js is your main express app file
const Component = require('../models/component');
jest.mock('../models/component'); // Mock the Component model for testing

describe('Component API', () => {
  // Test for Get All Components
  describe('GET /api/components', () => {
    it('should return all components', async () => {
      const mockComponents = [
        { partNo: 'ABC123', product: 'Product A', qty: 10 },
        { partNo: 'XYZ456', product: 'Product B', qty: 5 },
      ];

      Component.find.mockResolvedValue(mockComponents);

      const response = await request(app).get('/api/components');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual(mockComponents);
    });

    it('should return 500 if there is a server error', async () => {
      Component.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/components');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error fetching components');
    });
  });

  // Test for Add a New Component
  describe('POST /api/components', () => {
    it('should add a new component and return it', async () => {
      const newComponent = {
        product: 'New Product',
        partNo: 'NEW123',
        value: '100uF',
        qty: 20,
        footprint: 'SMD',
        description: 'New component description',
        status: 'In Stock',
      };

      const savedComponent = { ...newComponent, _id: 'mockId', stockID: 'mockStockID' };
      Component.prototype.save.mockResolvedValue(savedComponent);

      const response = await request(app).post('/api/components').send(newComponent);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id', 'mockId');
      expect(response.body.partNo).toBe(newComponent.partNo);
    });

    it('should return 400 if partNo is missing', async () => {
      const invalidComponent = { product: 'No PartNo Product' };

      const response = await request(app).post('/api/components').send(invalidComponent);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Part number is required');
    });
  });

  // Test for Update Component
  describe('PUT /api/components/:id', () => {
    it('should update a component by ID', async () => {
      const updateData = { product: 'Updated Product', partNo: 'Updated123', qty: 30 };
      const updatedComponent = { ...updateData, _id: 'mockId' };

      Component.findByIdAndUpdate.mockResolvedValue(updatedComponent);

      const response = await request(app).put('/api/components/mockId').send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', 'mockId');
      expect(response.body.product).toBe(updateData.product);
    });

    it('should return 404 if the component is not found', async () => {
      Component.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/api/components/mockId').send({});

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Component not found');
    });
  });

  // Test for Delete Component
  describe('DELETE /api/components/:id', () => {
    it('should delete a component by ID', async () => {
      const deletedComponent = { partNo: 'DELETE123', product: 'Delete Product' };

      Component.findByIdAndDelete.mockResolvedValue(deletedComponent);

      const response = await request(app).delete('/api/components/mockId');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Component deleted');
    });

    it('should return 404 if the component is not found', async () => {
      Component.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/api/components/mockId');

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Component not found');
    });
  });

  // Test for Search Components by Part Number
  describe('GET /api/components/search', () => {
    it('should return components by partNo', async () => {
      const mockComponents = [{ partNo: 'SEARCH123', product: 'Search Product' }];
      Component.find.mockResolvedValue(mockComponents);

      const response = await request(app).get('/api/components/search?partNo=SEARCH123');

      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty('partNo', 'SEARCH123');
    });

    it('should return 400 if partNo is not provided', async () => {
      const response = await request(app).get('/api/components/search');

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Part number is required for search');
    });
  });

  // Test for Get Low-Stock Components
  
});
