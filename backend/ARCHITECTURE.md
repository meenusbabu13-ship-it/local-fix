# LocalFix Backend Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                            │
│                 (http://localhost:5173)                      │
│                                                              │
│  - UI Components                                            │
│  - State Management                                         │
│  - Routing                                                  │
│  - Animations                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Requests (JSON)
                       │ Authorization: Bearer <JWT>
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js Backend                          │
│                 (http://localhost:5000)                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              CORS Middleware                        │    │
│  │  Origin: http://localhost:5173                     │    │
│  └────────────────────────────────────────────────────┘    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Routes Layer                           │    │
│  │                                                     │    │
│  │  /api/auth/*     (Public)                         │    │
│  │  /api/users/*    (Protected - User)               │    │
│  │  /api/providers/* (Protected - Provider)          │    │
│  │  /api/admin/*    (Protected - Admin)              │    │
│  └────────────────────────────────────────────────────┘    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Middleware Layer                          │    │
│  │                                                     │    │
│  │  1. JWT Verification (auth.middleware.js)         │    │
│  │  2. Role Check (role.middleware.js)               │    │
│  └────────────────────────────────────────────────────┘    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Controllers Layer                         │    │
│  │                                                     │    │
│  │  - auth.controller.js                             │    │
│  │  - user.controller.js                             │    │
│  │  - provider.controller.js                         │    │
│  │  - admin.controller.js                            │    │
│  └────────────────────────────────────────────────────┘    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Models Layer                           │    │
│  │                                                     │    │
│  │  - User.js (Mongoose Schema)                      │    │
│  │  - Provider.js (Mongoose Schema)                  │    │
│  │  - Admin.js (Mongoose Schema)                     │    │
│  │  - Booking.js (Mongoose Schema)                   │    │
│  └────────────────────────────────────────────────────┘    │
│                         ▼                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Error Handling                            │    │
│  │  (error.middleware.js)                             │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                          │
│                 (mongodb://127.0.0.1:27017)                 │
│                                                              │
│  Collections:                                               │
│  - users                                                    │
│  - providers                                                │
│  - admins                                                   │
│  - bookings                                                 │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### Public Request (Login/Register)

```
Frontend → POST /api/auth/login
         ↓
    Express Router
         ↓
    auth.controller.js
         ↓
    Find user in DB
         ↓
    Verify password (bcrypt)
         ↓
    Generate JWT token
         ↓
    Return { success, token, user }
         ↓
    Frontend stores token
```

### Protected Request (Get Profile)

```
Frontend → GET /api/users/profile
         ↓ (with Authorization: Bearer <token>)
    Express Router
         ↓
    auth.middleware.js (verify JWT)
         ↓
    role.middleware.js (check role = 'user')
         ↓
    user.controller.js
         ↓
    Query MongoDB
         ↓
    Return user data
         ↓
    Frontend displays profile
```

## 🔐 Authentication Flow

```
┌──────────┐
│  Client  │
└────┬─────┘
     │
     │ 1. POST /api/auth/register
     │    { name, email, password }
     ▼
┌──────────────┐
│   Backend    │
│              │
│ - Hash pwd   │
│ - Save user  │
│ - Gen token  │
└────┬─────────┘
     │
     │ 2. Return { token, user }
     ▼
┌──────────┐
│  Client  │
│          │
│ Store:   │
│ - token  │
│ - user   │
└────┬─────┘
     │
     │ 3. Subsequent requests
     │    Authorization: Bearer <token>
     ▼
┌──────────────┐
│   Backend    │
│              │
│ - Verify JWT │
│ - Check role │
│ - Process    │
└────┬─────────┘
     │
     │ 4. Return data
     ▼
┌──────────┐
│  Client  │
└──────────┘
```

## 📊 Database Schema

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ _id: ObjectId       │
│ name: String        │
│ email: String       │
│ password: String    │ (hashed)
│ role: "user"        │
│ createdAt: Date     │
│ updatedAt: Date     │
└─────────────────────┘

┌─────────────────────┐
│     Provider        │
├─────────────────────┤
│ _id: ObjectId       │
│ name: String        │
│ email: String       │
│ password: String    │ (hashed)
│ serviceCategory     │
│ availability        │
│ role: "provider"    │
│ createdAt: Date     │
│ updatedAt: Date     │
└─────────────────────┘

┌─────────────────────┐
│       Admin         │
├─────────────────────┤
│ _id: ObjectId       │
│ email: String       │
│ password: String    │ (hashed)
│ role: "admin"       │
│ createdAt: Date     │
│ updatedAt: Date     │
└─────────────────────┘

┌─────────────────────┐
│      Booking        │
├─────────────────────┤
│ _id: ObjectId       │
│ userId: ObjectId    │ → User
│ providerId: ObjectId│ → Provider
│ service: String     │
│ date: Date          │
│ status: String      │
│ createdAt: Date     │
│ updatedAt: Date     │
└─────────────────────┘
```

## 🛣️ API Routes Map

```
/api
│
├── /auth (Public)
│   ├── POST /register
│   └── POST /login
│
├── /users (Protected - User Role)
│   ├── GET  /profile
│   └── PUT  /profile
│
├── /providers (Protected - Provider Role)
│   ├── GET  /dashboard
│   └── PUT  /profile
│
└── /admin (Protected - Admin Role)
    ├── GET    /dashboard
    ├── GET    /users
    └── DELETE /users/:id
```

## 🔒 Security Layers

```
Request
   ↓
┌─────────────────┐
│  CORS Check     │ ← Only allow localhost:5173
└────────┬────────┘
         ↓
┌─────────────────┐
│  JWT Verify     │ ← Validate token signature
└────────┬────────┘
         ↓
┌─────────────────┐
│  Role Check     │ ← Verify user has required role
└────────┬────────┘
         ↓
┌─────────────────┐
│  Controller     │ ← Process business logic
└────────┬────────┘
         ↓
┌─────────────────┐
│  Database       │ ← Query/Update data
└────────┬────────┘
         ↓
┌─────────────────┐
│  Response       │ ← Return JSON
└─────────────────┘
```

## 📦 File Organization

```
backend/
│
├── src/
│   │
│   ├── config/          ← Configuration
│   │   └── db.js        (MongoDB connection)
│   │
│   ├── models/          ← Data schemas
│   │   ├── User.js
│   │   ├── Provider.js
│   │   ├── Admin.js
│   │   └── Booking.js
│   │
│   ├── controllers/     ← Business logic
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── provider.controller.js
│   │   └── admin.controller.js
│   │
│   ├── routes/          ← API endpoints
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── provider.routes.js
│   │   └── admin.routes.js
│   │
│   ├── middleware/      ← Request processing
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   │
│   └── server.js        ← Entry point
│
├── .env                 ← Environment variables
├── package.json         ← Dependencies
└── createAdmin.js       ← Utility script
```

## 🎯 Data Flow Example

### User Registration

```
Frontend Form
    ↓
{ name: "John", email: "john@test.com", password: "pass123" }
    ↓
POST /api/auth/register
    ↓
auth.controller.js → registerUser()
    ↓
Check if user exists
    ↓
Hash password with bcrypt
    ↓
Save to MongoDB (users collection)
    ↓
Generate JWT token
    ↓
Return { success: true, token, user }
    ↓
Frontend stores token & user
    ↓
Redirect to dashboard
```

### Protected API Call

```
Frontend needs user profile
    ↓
GET /api/users/profile
Headers: { Authorization: "Bearer eyJhbG..." }
    ↓
auth.middleware.js
    ↓
Extract token from header
    ↓
Verify JWT signature
    ↓
Decode payload → { id, role }
    ↓
Attach to req.user
    ↓
role.middleware.js
    ↓
Check req.user.role === 'user'
    ↓
user.controller.js → getUserProfile()
    ↓
Find user by req.user.id
    ↓
Return user data (exclude password)
    ↓
Frontend displays profile
```

## 🔄 Error Handling Flow

```
Error occurs
    ↓
Try/catch in controller
    ↓
next(error)
    ↓
error.middleware.js
    ↓
Identify error type:
  - ValidationError
  - DuplicateKeyError
  - CastError
  - JWTError
  - Generic Error
    ↓
Format error response
    ↓
Return { success: false, message, errors }
    ↓
Frontend displays error
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Secure authentication
- ✅ Role-based access control
- ✅ Scalable structure
- ✅ Easy to maintain
- ✅ Production-ready
