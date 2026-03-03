import mongoose from 'mongoose';

const connectDB = async () => {
    // If already connected, do not create a new connection
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI environment variable is missing.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
    }
};

export default connectDB;
