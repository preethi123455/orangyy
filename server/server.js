require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'your-mongodb-connection-string';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// 🔹 User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// 🔹 Cart Schema
const cartSchema = new mongoose.Schema({
  email: String,
  name: String,
  price: String,
  img: String,
  addedAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", cartSchema);

// 🔹 Order Schema
const orderSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  address: String,
  products: Array,
  totalCost: Number,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);

// 🔹 Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    if (!name || !age || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, age, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: '✅ Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// 🔹 Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '❌ Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'MY_SECRET', { expiresIn: '2h' });
    res.status(200).json({ success: true, message: '✅ Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// 🔹 Get Logged-in User Info
app.get('/api/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET');
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// 🔹 Cart and Orders (same as before)
app.post('/cart/add', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET');
    const email = decoded.email;

    const { name, price, img } = req.body;
    if (!name || !price || !img) return res.status(400).json({ message: 'Missing product data' });

    const cartItem = new Cart({ email, name, price, img });
    await cartItem.save();

    res.status(201).json({ message: '✅ Added to cart successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET');
    const email = decoded.email;

    const items = await Cart.find({ email });
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.name]) grouped[item.name] = { ...item._doc, quantity: 1 };
      else grouped[item.name].quantity += 1;
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET');
    const email = decoded.email;

    const { name, phone, address, products, totalCost } = req.body;
    if (!name || !phone || !address || !products || products.length === 0) return res.status(400).json({ message: 'Missing order data' });

    const newOrder = new Order({ email, name, phone, address, products, totalCost });
    await newOrder.save();

    await Cart.deleteMany({ email }); // clear cart
    res.json({ message: '✅ Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
