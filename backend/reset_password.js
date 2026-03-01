import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const resetPassword = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/localfix_db');
        const Provider = mongoose.connection.collection('providers');

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('password123', salt);

        const result = await Provider.updateOne(
            { email: 'ahikil@gmail.com' },
            { $set: { password: hash } }
        );

        console.log('Password reset successful for ahikil@gmail.com. New password: password123');
        console.log('Modified count:', result.modifiedCount);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetPassword();
