import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
            required: [true, 'Provider ID is required'],
        },
        service: {
            type: String,
            required: [true, 'Service type is required'],
            trim: true,
        },
        description: {
            type: String,
            required: false,
        },
        date: {
            type: String, // changing to String for easier UI handling or Date tracking
            required: [true, 'Booking date is required'],
        },
        time: {
            type: String,
            required: [false],
        },
        price: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
