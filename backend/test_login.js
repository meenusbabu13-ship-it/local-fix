const testFlow = async () => {
    try {
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: 'provider',
                name: 'Test Provider',
                email: 'testp@example.com',
                phone: '1234567890',
                password: 'testpassword',
                serviceCategory: 'plumbing',
                experience: 5,
                pricing: 50,
                address: '123 Test St',
                coverageRadius: 10,
                lat: 40,
                lng: -74,
                documents: []
            })
        });
        const regData = await regRes.json();
        console.log('Registration:', regData);

        const mongoose = await import('mongoose');
        await mongoose.connect('mongodb://127.0.0.1:27017/localfix_db');
        const Provider = mongoose.connection.collection('providers');
        await Provider.updateOne({ email: 'testp@example.com' }, { $set: { status: 'approved' } });

        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: 'provider',
                email: 'testp@example.com',
                password: 'testpassword'
            })
        });
        const loginData = await loginRes.json();
        console.log('Login:', loginData);

        // cleanup
        await Provider.deleteOne({ email: 'testp@example.com' });
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit();
    }
}
testFlow();
