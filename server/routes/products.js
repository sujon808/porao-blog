const express = require('express');
const router = express.Router();
const { query, run, get } = require('../db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all products (with search and category filtering)
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  let sql = 'SELECT * FROM products';
  const params = [];

  const conditions = [];
  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }
  if (search) {
    conditions.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Sort by newness
  sql += ' ORDER BY id DESC';

  try {
    const products = await query(sql, params);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products.', error: error.message });
  }
});

// Get all distinct categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await query('SELECT DISTINCT category FROM products WHERE category IS NOT NULL');
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories.', error: error.message });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product details.', error: error.message });
  }
});

// Add a product (Admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;

  if (!name || !price || !category || stock === undefined) {
    return res.status(400).json({ message: 'Please fill out all required fields: name, price, category, stock.' });
  }

  try {
    const result = await run(
      'INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, image_url, category, stock]
    );
    res.status(201).json({
      id: result.id,
      name,
      description,
      price,
      image_url,
      category,
      stock
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product.', error: error.message });
  }
});

// Update a product (Admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;

  if (!name || !price || !category || stock === undefined) {
    return res.status(400).json({ message: 'Please fill out all required fields: name, price, category, stock.' });
  }

  try {
    const existing = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await run(
      'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category = ?, stock = ? WHERE id = ?',
      [name, description, price, image_url, category, stock, req.params.id]
    );

    res.json({
      id: Number(req.params.id),
      name,
      description,
      price,
      image_url,
      category,
      stock
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product.', error: error.message });
  }
});

// Delete a product (Admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const existing = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    await run('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product.', error: error.message });
  }
});

module.exports = router;
