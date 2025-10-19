# Deployment Guide for Orange Juice App

## Deploy to Render.com

### Step 1: Backend Deployment

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**: `preethi123455/orangyy`
4. **Configure Backend Service:**
   - **Name**: `orangyy-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5002
   MONGO_URI=mongodb+srv://praneesh_chandran:praneesh%40773@orange-cluster.b4jao2q.mongodb.net/database1?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   ```

6. **Click "Create Web Service"**

### Step 2: Frontend Deployment

1. **Click "New +"** → **"Static Site"**
2. **Connect your GitHub repository**: `preethi123455/orangyy`
3. **Configure Frontend Service:**
   - **Name**: `orangyy-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Plan**: Free

4. **Add Environment Variables:**
   ```
   REACT_APP_API_URL=https://orangyy-backend.onrender.com
   ```

5. **Click "Create Static Site"**

### Step 3: Update Backend URL

After backend deployment, update the frontend environment variable:
- Go to your frontend service settings
- Update `REACT_APP_API_URL` to your actual backend URL
- Redeploy the frontend

## Alternative: Manual Deployment

### Backend (Node.js Service)

1. Create a new Web Service on Render
2. Connect to GitHub repository
3. Use these settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Frontend (Static Site)

1. Create a new Static Site on Render
2. Connect to GitHub repository
3. Use these settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
PORT=5002
MONGO_URI=mongodb+srv://praneesh_chandran:praneesh%40773@orange-cluster.b4jao2q.mongodb.net/database1?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

### Frontend
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Testing Deployment

1. **Backend**: Visit `https://your-backend-url.onrender.com/api/me` (should return error without token)
2. **Frontend**: Visit your frontend URL and test:
   - User registration
   - User login
   - Add items to cart
   - Place orders

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in package.json
2. **CORS Errors**: Ensure backend has CORS enabled for your frontend domain
3. **Database Connection**: Verify MongoDB URI is correct
4. **Environment Variables**: Make sure all required env vars are set in Render

### Useful Commands:

```bash
# Check backend logs
# Go to your backend service → Logs tab

# Check frontend build logs  
# Go to your frontend service → Logs tab
```

## Expected URLs

After successful deployment:
- **Backend**: `https://orangyy-backend.onrender.com`
- **Frontend**: `https://orangyy-frontend.onrender.com`

## Notes

- Free tier has limitations (sleeps after 15 minutes of inactivity)
- Database connection should work with the provided MongoDB URI
- JWT tokens are configured for 2-hour expiration
- All API endpoints are ready for production use
