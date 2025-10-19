# Render Deployment Configuration

## Backend Service Configuration

**Service Name:** `orangyy-backend`
**Environment:** Node.js
**Root Directory:** `server`
**Build Command:** `npm install`
**Start Command:** `npm start`

**Environment Variables:**
```
NODE_ENV=production
PORT=5002
MONGO_URI=mongodb+srv://praneesh_chandran:praneesh%40773@orange-cluster.b4jao2q.mongodb.net/database1?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

## Frontend Service Configuration

**Service Name:** `orangyy-frontend`
**Environment:** Static Site
**Root Directory:** `client`
**Build Command:** `npm install && npm run build`
**Publish Directory:** `build`

**Environment Variables:**
```
REACT_APP_API_URL=https://YOUR_ACTUAL_BACKEND_URL.onrender.com
```

## Steps to Fix Current Issues:

### 1. Update Frontend Environment Variable

1. Go to your Render dashboard
2. Find your frontend service (`orangyy-frontend`)
3. Click on the service name
4. Go to "Environment" tab
5. Find `REACT_APP_API_URL`
6. Update it to your actual backend URL (replace `YOUR_ACTUAL_BACKEND_URL` with your real backend URL)
7. Click "Save Changes"
8. The frontend will automatically redeploy

### 2. Add Sample Products

After updating the URL, add sample products to your database:

1. Go to your backend URL (e.g., `https://orangyy-backend-xyz.onrender.com`)
2. Add `/api/products/seed` to the URL
3. Make a POST request to: `https://your-backend-url.onrender.com/api/products/seed`
4. This will add sample orange juice products

### 3. Test Your Application

Once both steps are complete:
1. Visit your frontend URL
2. Test signup/login
3. Browse products
4. Add items to cart
5. Place orders

## Expected Results:

- ✅ No more CORS errors
- ✅ Products will load correctly
- ✅ Authentication will work
- ✅ Shopping cart will function
- ✅ All API endpoints will respond

## Troubleshooting:

If you still see errors:
1. Check that your backend URL is correct
2. Verify the backend service is running
3. Make sure sample products are added
4. Check the browser console for specific error messages
