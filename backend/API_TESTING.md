# API Testing Examples

Use these examples with Postman, Thunder Client, or curl.

## 1. Health Check

```bash
curl http://localhost:5000/api/health
```

## 2. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 3. Register Provider

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "provider",
    "serviceCategory": "plumbing"
  }'
```

## 4. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Copy the token from the response for protected requests!**

## 5. Get User Profile (Protected)

```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 6. Update User Profile (Protected)

```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

## 7. Login Provider

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123",
    "role": "provider"
  }'
```

## 8. Get Provider Dashboard (Protected)

```bash
curl http://localhost:5000/api/providers/dashboard \
  -H "Authorization: Bearer YOUR_PROVIDER_TOKEN_HERE"
```

## 9. Update Provider Profile (Protected)

```bash
curl -X PUT http://localhost:5000/api/providers/profile \
  -H "Authorization: Bearer YOUR_PROVIDER_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Updated",
    "serviceCategory": "electrical",
    "availability": "available"
  }'
```

## 10. Login Admin

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@localfix.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 11. Get Admin Dashboard (Protected)

```bash
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

## 12. Get All Users (Admin Only)

```bash
curl http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

## 13. Delete User (Admin Only)

```bash
curl -X DELETE "http://localhost:5000/api/admin/users/USER_ID_HERE?userType=user" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

## 14. Delete Provider (Admin Only)

```bash
curl -X DELETE "http://localhost:5000/api/admin/users/PROVIDER_ID_HERE?userType=provider" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

---

## Postman Collection Format

Import this JSON into Postman:

```json
{
  "info": {
    "name": "LocalFix API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": "http://localhost:5000/api/auth/register"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\",\n  \"role\": \"user\"\n}"
            },
            "url": "http://localhost:5000/api/auth/login"
          }
        }
      ]
    },
    {
      "name": "User",
      "item": [
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": "http://localhost:5000/api/users/profile"
          }
        }
      ]
    }
  ]
}
```

---

## Testing Workflow

1. **Register a user** → Get token
2. **Login** → Get fresh token
3. **Use token** in Authorization header for protected routes
4. **Test each endpoint** with appropriate role

## Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error
