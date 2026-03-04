import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI environment variable is not set.');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Do NOT call process.exit(1) — it kills the Vercel serverless
        // function and causes Vercel to return an HTML error page instead
        // of our JSON response. Just log the error; the global DB-check
        // middleware in server.js will return a proper JSON 500 response.
        console.error(`MongoDB connection error: ${error.message}`);
    }
};

export default connectDB;
