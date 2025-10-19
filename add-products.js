// Script to add sample products to your database
// Run this after your backend is deployed

const axios = require('axios');

const BACKEND_URL = 'https://your-backend-url.onrender.com'; // Replace with your actual backend URL

async function addSampleProducts() {
  try {
    console.log('Adding sample products to database...');
    
    const response = await axios.post(`${BACKEND_URL}/api/products/seed`);
    console.log('✅ Sample products added successfully!');
    console.log('Response:', response.data);
    
    // Test the products endpoint
    const productsResponse = await axios.get(`${BACKEND_URL}/api/products`);
    console.log('✅ Products endpoint working!');
    console.log('Products count:', productsResponse.data.products.length);
    
  } catch (error) {
    console.error('❌ Error adding products:', error.message);
    console.error('Make sure your backend URL is correct and the service is running');
  }
}

// Uncomment the line below and replace the URL with your actual backend URL
// addSampleProducts();
