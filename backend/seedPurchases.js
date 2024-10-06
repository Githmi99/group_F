const mongoose = require('mongoose');
require('./config/db'); // Ensure the database connection is established
const Purchase = require('./models/Purchase'); // Import the Purchase model

const defaultPurchases = [
    {
        orderID: '7676', // Correct field name should match schema
        product: 'Resistor',
        quantity: 1000,
        paymentLinkOrShop: 'Store name', // Correct field name should match schema
        cost: 1020,
        date: '2022-07-01',
        status: 'Unpaid'
    },
    {
        orderID: '7676', // Correct field name should match schema
        product: 'Resistor',
        quantity: 3000,
        paymentLinkOrShop: 'www.tronic.lk', // Correct field name should match schema
        cost: 2300,
        date: '2024-03-16',
        status: 'Paid'
    },
    {
        orderID: '7676', // Correct field name should match schema
        product: 'Capacitor',
        quantity: 150,
        paymentLinkOrShop: 'Store name', // Correct field name should match schema
        cost: 580,
        date: '2023-12-04',
        status: 'Paid'
    },
    {
        orderID: '7676', // Correct field name should match schema
        product: 'Relay',
        quantity: 25,
        paymentLinkOrShop: 'www.mouser.com', // Correct field name should match schema
        cost: 1960,
        date: '2024-01-02',
        status: 'Paid'
    },
    {
        orderID: '7676', // Correct field name should match schema
        product: 'IC',
        quantity: 5,
        paymentLinkOrShop: 'Store name', // Correct field name should match schema
        cost: 2578,
        date: '2024-03-01',
        status: 'Paid'
    }
];

const seedPurchases = async () => {
    try {
        // Clear the collection before seeding
        await Purchase.deleteMany();

        // Insert default purchases
        await Purchase.insertMany(defaultPurchases);

        console.log('Default purchases added successfully');
    } catch (error) {
        console.error('Error adding default purchases:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

// Run the seeding script
seedPurchases();
