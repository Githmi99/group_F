const request = require('supertest');
const app = require('../app.js'); // Adjust the path to your app file
const BoM = require('../models/BoM');
const mongoose = require('mongoose');

// beforeAll(async () => {
//   // Connect to a test database
//   await mongoose.connect('mongodb://localhost:27017/test', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });


afterAll(async () => {
  // Clean up the test database and close the connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('BoM API', () => {
  let bomId;

  test('Create a new BoM', async () => {
    const bomData = {
      name: 'Test BoM',
      description: 'A test BoM',
      bomItems: [
        {
          partNumber: '123ABC',
          quantity: 10,
          cost: 5.0,
          footprint: 'SMD',
          description: 'A test component',
        },
      ],
    };

    const response = await request(app).post('/api/bom').send(bomData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(bomData.name);
    bomId = response.body._id; // Store the created BoM ID for later tests
  });

  test('Get all BoMs', async () => {
    const response = await request(app).get('/api/boms');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Get BoM by ID', async () => {
    const response = await request(app).get(`/api/bom/${bomId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', bomId);
  });

  test('Update BoM by ID', async () => {
    const updatedData = {
      name: 'Updated BoM',
      description: 'An updated BoM',
    };

    const response = await request(app).put(`/api/bom/${bomId}`).send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  test('Delete BoM by ID', async () => {
    const response = await request(app).delete(`/api/bom/${bomId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('BoM deleted successfully');
  });

  test('Search in stock', async () => {
    const bomData = {
      name: 'Test BoM',
      description: 'A test BoM',
      bomItems: [
        {
          partNumber: '123ABC',
          quantity: 5,
          cost: 5.0,
          footprint: 'SMD',
          description: 'A test component',
        },
      ],
    };

    // Create a BoM for the stock check
    const createResponse = await request(app).post('/api/bom').send(bomData);
    const stockResponse = await request(app).get(`/api/bom/stock/${createResponse.body._id}`);
    expect(stockResponse.statusCode).toBe(200);
    expect(stockResponse.body).toHaveProperty('inStock');
    expect(stockResponse.body).toHaveProperty('notInStock');
  });
});
