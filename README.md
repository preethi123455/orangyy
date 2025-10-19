# Orange Juice App - Full Stack Project

A complete full-stack application for ordering orange juice products with authentication and shopping cart functionality.

## Project Structure

```
orangyy/
├── server/          # Node.js Express backend
│   ├── package.json (NEW)
│   ├── server.js
│   └── .env
├── client/          # React frontend
│   ├── package.json
│   ├── .env.production
│   ├── .env.development (NEW)
│   └── src/
│       ├── Signup.js
│       ├── Login.js (FIXED)
│       └── ...
└── README.md (NEW)
```

## Setup Instructions

### 1. Backend Setup (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Make sure .env is configured with:
# - MONGO_URI (MongoDB connection string)
# - JWT_SECRET (for token authentication)
# - PORT (server port, default 5002)

# Start the server
npm start
# For development with auto-reload:
npm run dev
```

**Server Dependencies:**

- express (4.18.2) - Web framework
- mongoose (7.5.0) - MongoDB ODM
- cors (2.8.5) - Cross-origin requests
- jsonwebtoken (9.1.0) - JWT authentication
- bcryptjs (2.4.3) - Password hashing
- dotenv (16.3.1) - Environment variables

### 2. Frontend Setup (Client)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# For development (local):
npm start
# This will use .env.development (http://localhost:5002)

# For production:
npm run build
# This will use .env.production (https://orangyy-backend-1.onrender.com)
```

## Environment Variables

### Server (.env)

```
MONGO_URI=mongodb+srv://praneesh_chandran:praneesh%40773@orange-cluster.b4jao2q.mongodb.net/database1?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5002
```

### Client (.env.development - for local development)

```
REACT_APP_API_URL=http://localhost:5002
```

### Client (.env.production - for production)

```
REACT_APP_API_URL=https://orangyy-backend-1.onrender.com
```

## Features Fixed ✅

### 1. **Server (server.js)**

- ✅ All dependencies properly configured
- ✅ MongoDB connection working
- ✅ JWT authentication implemented
- ✅ Password hashing with bcryptjs
- ✅ User signup endpoint
- ✅ User login endpoint
- ✅ Cart management endpoints
- ✅ Order management endpoints
- ✅ Protected routes with JWT verification

### 2. **Signup (Signup.js)**

- ✅ Form validation (name, age, email, password)
- ✅ API integration with backend
- ✅ User-friendly error messages
- ✅ Auto-redirect to login on success
- ✅ Styled consistently with the app theme

### 3. **Login (Login.js)**

- ✅ **FIXED**: Changed from face recognition to email/password
- ✅ Form validation
- ✅ JWT token storage
- ✅ Auth state synchronization
- ✅ Auto-redirect to home on success
- ✅ Styled consistently with signup page

## API Endpoints

### Authentication

- `POST /signup` - Register new user
- `POST /login` - Login with email & password
- `GET /api/me` - Get current user info (requires token)

### Cart

- `POST /cart/add` - Add item to cart (requires token)
- `GET /cart` - Get all cart items (requires token)

### Orders

- `POST /orders` - Create new order (requires token)

## How to Run Locally

### Terminal 1: Start Backend

```bash
cd server
npm install
npm start
# Server runs on http://localhost:5002
```

### Terminal 2: Start Frontend

```bash
cd client
npm install
npm start
# App opens on http://localhost:3000
```

## Testing the Flow

1. **Signup**: Go to http://localhost:3000/signup

   - Fill in: Name, Age, Email, Password
   - Click Signup
   - You'll be redirected to Login

2. **Login**: Go to http://localhost:3000/login

   - Use the email and password you just created
   - Click Login
   - You'll be redirected to Home

3. **Browse & Shop**: Add items to cart and proceed to checkout

## Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution**: Make sure to run `npm install` in both server and client directories

### Issue: MongoDB connection fails

**Solution**: Check MONGO_URI in server/.env is correct and MongoDB cluster is active

### Issue: Login fails with "Invalid credentials"

**Solution**: Make sure you're using the correct email and password from signup

### Issue: CORS errors

**Solution**: The server has CORS enabled for all origins. If issues persist, check that API_URL is correct in .env files

### Issue: Token errors when accessing protected routes

**Solution**: Make sure you're logged in and token is stored in localStorage

## Notes

- JWT tokens expire after 2 hours
- Passwords are hashed using bcryptjs before storing
- Never commit .env files with real credentials to version control
- Change JWT_SECRET in production to a secure random string

## Support

If you encounter any issues, check:

1. Both npm installs completed successfully
2. Environment variables are correctly set
3. MongoDB connection is active
4. Backend server is running on port 5002
5. Frontend is accessing correct API URL

Happy coding! 🚀
