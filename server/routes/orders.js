const express = require('express');
const router = express.Router();
const { query, run, get } = require('../db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Create a new order (Place Order)
router.post('/', authenticateToken, async (req, res) => {
  const { items, total_amount, shipping_address, contact_number } = req.body;

  if (!items || !items.length || !total_amount || !shipping_address || !contact_number) {
    return res.status(400).json({ message: 'Missing order details: items, total_amount, address, contact.' });
  }

  try {
    // Begin TRANSACTION
    await run('BEGIN TRANSACTION');

    // 1. Verify stock of all items first
    for (const item of items) {
      const product = await get('SELECT stock, name FROM products WHERE id = ?', [item.product_id]);
      if (!product) {
        await run('ROLLBACK');
        return res.status(404).json({ message: `Product not found: ID ${item.product_id}` });
      }
      if (product.stock < item.quantity) {
        await run('ROLLBACK');
        return res.status(400).json({ message: `Insufficient stock for product: "${product.name}". Available: ${product.stock}, Ordered: ${item.quantity}` });
      }
    }

    // 2. Insert Order record
    const orderResult = await run(
      'INSERT INTO orders (user_id, total_amount, status, shipping_address, contact_number) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, total_amount, 'pending', shipping_address, contact_number]
    );
    const orderId = orderResult.id;

    // 3. Insert Order Items & Decrement Stock
    for (const item of items) {
      // Insert item
      await run(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      // Decrement product stock
      await run(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Commit Transaction
    await run('COMMIT');
    res.status(201).json({ message: 'Order placed successfully.', orderId });
  } catch (error) {
    await run('ROLLBACK');
    res.status(500).json({ message: 'Failed to place order.', error: error.message });
  }
});

// Get logged-in user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    // Get orders
    const orders = await query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC',
      [req.user.id]
    );

    // Get order items for each order
    const populatedOrders = [];
    for (const order of orders) {
      const items = await query(
        `SELECT oi.*, p.name as product_name, p.image_url 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );
      populatedOrders.push({ ...order, items });
    }

    res.json(populatedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders.', error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Get all orders with buyer's name
    const orders = await query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email 
       FROM orders o 
       JOIN users u ON o.user_id = u.id 
       ORDER BY o.id DESC`
    );

    const populatedOrders = [];
    for (const order of orders) {
      const items = await query(
        `SELECT oi.*, p.name as product_name, p.image_url 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [order.id]
      );
      populatedOrders.push({ ...order, items });
    }

    res.json(populatedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders.', error: error.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', authenticateToken, isAdmin, async (req, res) => {
  const { status } = req.body;
  
  if (!status || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid order status.' });
  }

  try {
    const existing = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Order status updated successfully.', status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status.', error: error.message });
  }
});

module.exports = router;
