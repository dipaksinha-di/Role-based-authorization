🔐 Role-Based Authorization API Documentation

This backend implements JWT-based authentication with role-based authorization.
Different routes are accessible based on user roles such as admin, manager, and user.

📌 Base URL
http://localhost:7001/api

🧑‍💻 Authentication (Auth)
1️⃣ Register User

Endpoint

POST /auth/register


Description
Registers a new user with a specific role.

Request Body (JSON)

{
  "username": "dipak",
  "password": "1234",
  "role": "admin"
}


Allowed Roles

admin

manager

user

⚠️ If an invalid role is provided (e.g. "hungry"), the request should fail.

Success Response

{
  "message": "User registered successfully"
}

2️⃣ Login User

Endpoint

POST /auth/login


Description
Authenticates a user and returns a JWT token.

Request Body (JSON)

{
  "username": "usha",
  "password": "1234"
}


Success Response

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


📌 Save this token — it is required to access protected routes.

👥 Users Routes (Role-Based Access)

All routes below are protected and require a JWT token.

🔑 Authorization Header Format
Authorization: Bearer <JWT_TOKEN>

👑 Admin Route

Endpoint

GET /users/admin


Access

✅ Admin only

Headers

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json


Response

{
  "message": "Welcome Admin"
}

🧑‍💼 Manager Route

Endpoint

GET /users/manager


Access

✅ Manager only

Headers

Authorization: Bearer <JWT_TOKEN>


Response

{
  "message": "Welcome Manager"
}

👤 User Route

Endpoint

GET /users/user


Access

✅ User only

Headers

Authorization: Bearer <JWT_TOKEN>


Response

{
  "message": "Welcome User"
}

❌ Unauthorized Access Example

If a user tries to access a route without the required role:

{
  "error": "Access denied"
}

🔐 JWT Payload Example
{
  "id": "6970946d846970822835d16e",
  "role": "user",
  "iat": 1768991492,
  "exp": 1768995092
}

🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcrypt

📁 Project Features

✔ User Registration
✔ Login Authentication
✔ JWT Security
✔ Role-Based Authorization
✔ Protected Routes

🚀 How to Test Using Postman

Register a user

Login to get JWT token

Copy token

Add header:

Authorization: Bearer <token>
