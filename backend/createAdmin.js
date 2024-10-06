// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const db = require('./config/db');

async function createAdmin() {
    const adminEmail = 'admin@example.com';
    const adminPassword = '12345678'; // Replace with a strong password
    const adminName = 'Admin User';

    try {
        let user = await User.findOne({ email: adminEmail });
        if (user) {
            console.log('Admin user already exists');
            return;
        }

        user = new User({
            email: adminEmail,
            password: await bcrypt.hash(adminPassword, 10),
            name: adminName,
            role: 'admin' // Set the role as admin
        });

        await user.save();
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err.message);
    } finally {
        mongoose.connection.close();
    }
}

createAdmin();
