# LocalFix Backend - Quick Start Guide

## ✅ Backend Setup Complete!

All files have been generated and dependencies installed.

## 🚀 How to Run

### 1. Start MongoDB (Required)

Make sure MongoDB is running on your system:

```bash
# If MongoDB is installed as a service, it should already be running
# Otherwise, start it manually:
mongod
```

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: 127.0.0.1
🚀 Server running on port 5000
🌐 Frontend URL: http://localhost:5173
```

### 3. Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Or visit in browser:**
```
http://localhost:5000/api/health
```

## 🔗 Connect to Frontend

Your React frontend should make API calls to:
```
http://localhost:5000/api/*
```

### Example Frontend API Call:

```javascript
// Login example
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  })
});

const data = await response.json();
const token = data.token; // Store this token

// Protected request example
const profileResponse = await fetch('http://localhost:5000/api/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
```

## 📋 Available Endpoints

### Public (No Auth Required)
- `POST /api/auth/register` - Register user/provider
- `POST /api/auth/login` - Login
- `GET /api/health` - Health check

### Protected (JWT Required)
- `GET /api/users/profile` - User profile (user role)
- `PUT /api/users/profile` - Update profile (user role)
- `GET /api/providers/dashboard` - Provider dashboard (provider role)
- `PUT /api/providers/profile` - Update provider (provider role)
- `GET /api/admin/dashboard` - Admin stats (admin role)
- `GET /api/admin/users` - List users (admin role)
- `DELETE /api/admin/users/:id` - Delete user (admin role)

## 🧪 Testing with Postman/Thunder Client

### 1. Register a User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

Copy the `token` from the response.

### 3. Get Profile (Protected)
```
GET http://localhost:5000/api/users/profile
Headers:
Authorization: Bearer <paste_token_here>
```

## 🔐 Create Admin User

Since there's no public admin registration, create an admin manually in MongoDB:

```javascript
// In MongoDB shell or Compass
use localfix

db.admins.insertOne({
  email: "admin@localfix.com",
  password: "$2b$10$YourHashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use this Node.js script (create `createAdmin.js`):

```javascript
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Admin from './src/models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const admin = await Admin.create({
    email: 'admin@localfix.com',
    password: 'admin123' // Will be hashed automatically
  });
  
  console.log('Admin created:', admin.email);
  process.exit(0);
};

createAdmin();
```

Run: `node createAdmin.js`

## ⚠️ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Default: `mongodb://127.0.0.1:27017/localfix`

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 5000

### CORS Errors
- Ensure frontend is running on `http://localhost:5173`
- Or update `CLIENT_URL` in `.env`

## 📝 Environment Variables

Edit `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/localfix
JWT_SECRET=your_super_secret_jwt_key_replace_in_production_2024
CLIENT_URL=http://localhost:5173
```

**Important:** Change `JWT_SECRET` to a random secure string in production!

## ✨ Features Implemented

✅ User registration and login  
✅ Provider registration and login  
✅ Admin login  
✅ JWT authentication  
✅ Role-based access control  
✅ Password hashing with bcrypt  
✅ CORS enabled for frontend  
✅ Error handling  
✅ Input validation  
✅ MongoDB integration  
✅ RESTful API design  

## 🎯 Next Steps

1. ✅ Backend is ready
2. Start MongoDB
3. Run `npm run dev`
4. Test endpoints
5. Connect your React frontend
6. Start building features!

---

**Your backend is production-ready and waiting for your frontend! 🚀**
