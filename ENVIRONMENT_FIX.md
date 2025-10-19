# Environment Configuration Fix

## Current Issues:
1. Frontend still using placeholder URL: `https://your-backend-url.onrender.com`
2. JWT token decode errors
3. 404 errors for API endpoints
4. CORS errors

## Step-by-Step Fix:

### 1. Find Your Actual Backend URL

1. Go to your Render dashboard
2. Find your backend service (should be named `orangyy-backend` or similar)
3. Copy the URL (it should look like `https://orangyy-backend-xyz.onrender.com`)

### 2. Update Frontend Environment Variable

1. Go to your Render dashboard
2. Find your frontend service (`orangyy-frontend`)
3. Click on the service name
4. Go to "Environment" tab
5. Find `REACT_APP_API_URL`
6. Update it to your actual backend URL (replace the placeholder)
7. Click "Save Changes"
8. The frontend will automatically redeploy

### 3. Add Sample Products to Database

After updating the URL, add sample products:

1. Go to your backend URL (e.g., `https://orangyy-backend-xyz.onrender.com`)
2. Add `/api/products/seed` to the URL
3. Make a POST request to: `https://your-backend-url.onrender.com/api/products/seed`
4. This will add sample orange juice products

### 4. Test Your Application

Once both steps are complete:
1. Visit your frontend URL
2. Test signup/login
3. Browse products
4. Add items to cart
5. Place orders

## Alternative: Manual Environment File

If you can't access Render dashboard, create a `.env` file in your `client` directory:

```
REACT_APP_API_URL=https://your-actual-backend-url.onrender.com
```

Then commit and push:
```bash
git add client/.env
git commit -m "Add environment configuration"
git push origin main
```

## Expected Results:

- ✅ No more CORS errors
- ✅ Products will load correctly
- ✅ Authentication will work
- ✅ Shopping cart will function
- ✅ All API endpoints will respond
- ✅ JWT token errors will be resolved

## Troubleshooting:

If you still see errors:
1. Check that your backend URL is correct
2. Verify the backend service is running
3. Make sure sample products are added
4. Check the browser console for specific error messages
5. Ensure the frontend has redeployed after environment variable change

## Quick Test Commands:

```bash
# Test backend health
curl https://your-backend-url.onrender.com/api/me

# Add sample products
curl -X POST https://your-backend-url.onrender.com/api/products/seed

# Test products endpoint
curl https://your-backend-url.onrender.com/api/products
```

## Your Backend URL Should Look Like:
- `https://orangyy-backend-xyz.onrender.com`
- `https://orangyy-backend-abc.onrender.com`
- `https://orangyy-backend-123.onrender.com`

Replace `your-backend-url.onrender.com` with your actual backend URL in the frontend environment variable.
