require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Initializes SQLite database and seeds if needed

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Simple healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Porao Shop Backend is running smoothly.' });
});

// Serve static assets if in production (optional fallback)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
