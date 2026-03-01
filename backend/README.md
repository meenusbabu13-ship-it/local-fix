# LocalFix Backend API

Production-ready REST API backend for LocalFix - Home Service Booking Platform

## 🚀 Tech Stack

- **Node.js** (ES Modules)
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Provider.js           # Provider model
│   │   ├── Admin.js              # Admin model
│   │   └── Booking.js            # Booking model
│   │
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── user.controller.js    # User operations
│   │   ├── provider.controller.js # Provider operations
│   │   └── admin.controller.js   # Admin operations
│   │
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoints
│   │   ├── user.routes.js        # User endpoints
│   │   ├── provider.routes.js    # Provider endpoints
│   │   └── admin.routes.js       # Admin endpoints
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── role.middleware.js    # Role-based access
│   │   └── error.middleware.js   # Error handling
│   │
│   └── server.js                 # Entry point
│
├── .env                          # Environment variables
├── package.json
└── README.md
```

## 🔧 Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Update `.env` file with your settings
   - Change `JWT_SECRET` to a secure random string

4. **Ensure MongoDB is running:**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user/provider |
| POST | `/api/auth/login` | Login user/provider/admin |

### User Routes (Protected - User Role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

### Provider Routes (Protected - Provider Role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/providers/dashboard` | Get provider dashboard |
| PUT | `/api/providers/profile` | Update provider profile |

### Admin Routes (Protected - Admin Role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get admin statistics |
| GET | `/api/admin/users` | Get all users/providers |
| DELETE | `/api/admin/users/:id` | Delete user/provider |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## 📝 API Usage Examples

### Register User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Register Provider

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "provider",
  "serviceCategory": "plumbing"
}
```

### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Protected Request (with JWT)

```bash
GET http://localhost:5000/api/users/profile
Authorization: Bearer <your_jwt_token>
```

## 🔐 Authentication Flow

1. **Register/Login** → Receive JWT token
2. **Store token** in frontend (localStorage/sessionStorage)
3. **Send token** in Authorization header: `Bearer <token>`
4. **Backend validates** token and role
5. **Access granted** if valid

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling
- ✅ Secure HTTP headers

## 🗄️ Database Models

### User
- name, email, password (hashed), role

### Provider
- name, email, password (hashed), serviceCategory, availability, role

### Admin
- email, password (hashed), role

### Booking
- userId (ref), providerId (ref), service, date, status

## 🔄 Frontend Integration

The backend is configured to work with your React frontend at `http://localhost:5173`.

**Frontend should:**
1. Make API calls to `http://localhost:5000/api/*`
2. Include JWT token in headers: `Authorization: Bearer <token>`
3. Handle responses (success/error)
4. Store user data and token

## 🐛 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

## 📊 Response Format

Success responses:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {} // Response data
}
```

## 🔍 Testing

Test the API using:
- **Postman** - Import endpoints
- **Thunder Client** (VS Code extension)
- **cURL** - Command line
- **Frontend** - Direct integration

## 🚨 Important Notes

1. **Change JWT_SECRET** in production
2. **Use environment variables** for sensitive data
3. **Enable MongoDB authentication** in production
4. **Use HTTPS** in production
5. **Rate limiting** recommended for production
6. **Input sanitization** for XSS protection

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Start MongoDB
3. Run server: `npm run dev`
4. Test endpoints
5. Connect frontend
6. Create admin user manually in MongoDB

## 📞 Support

For issues or questions, check:
- MongoDB connection
- Environment variables
- Port availability (5000)
- CORS settings

---

**Backend is ready to connect with your React frontend! 🎉**
