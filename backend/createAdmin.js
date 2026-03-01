import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@localfix.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin already exists with email: admin@localfix.com');
            process.exit(0);
        }

        // Create admin
        const admin = await Admin.create({
            email: 'admin@localfix.com',
            password: 'admin123', // Will be hashed automatically by the model
        });

        console.log('✅ Admin created successfully!');
        console.log('📧 Email: admin@localfix.com');
        console.log('🔑 Password: admin123');
        console.log('\n⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin();
