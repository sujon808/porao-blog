const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Helper function to run SQL queries
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function initializeDatabase() {
  try {
    // 1. Create Users Table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create Products Table
    await run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        category TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Orders Table
    await run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        shipping_address TEXT NOT NULL,
        contact_number TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // 4. Create Order Items Table
    await run(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

    console.log('Tables initialized successfully.');

    // Seed Default Admin User
    const adminEmail = 'admin@porao.com';
    const existingAdmin = await get('SELECT * FROM users WHERE email = ?', [adminEmail]);
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await run(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Porao Admin', adminEmail, hashedPassword, 'admin']
      );
      console.log('Default admin user seeded: admin@porao.com / admin123');
    }

    // Seed Standard Products
    const productCount = await get('SELECT COUNT(*) as count FROM products');
    if (productCount.count === 0) {
      const sampleProducts = [
        {
          name: 'Porao Classic Panjabi',
          description: 'Premium quality cotton Panjabi with exquisite embroidery on collar and placket. Designed for comfort and elegant traditional look.',
          price: 2450.00,
          image_url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=600&auto=format&fit=crop',
          category: 'Panjabi',
          stock: 45
        },
        {
          name: 'Porao Premium Polo Shirt',
          description: '100% pique cotton casual polo shirt. Features a slim fit design, contrast details, and breathable comfort for daily wear.',
          price: 1200.00,
          image_url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
          category: 'Polo Shirts',
          stock: 60
        },
        {
          name: 'Traditional Jamdani Silk Sharee',
          description: 'Exquisitely handcrafted pure silk Jamdani sharee featuring traditional patterns. Elevates elegance for special festivals and weddings.',
          price: 5500.00,
          image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
          category: 'Sharee',
          stock: 15
        },
        {
          name: 'Urban Casual Denim Jacket',
          description: 'Classic heavy-wash blue denim jacket with double chest pockets. Timeless casual outerwear that pairs perfectly with any outfit.',
          price: 2800.00,
          image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
          category: 'Jackets',
          stock: 25
        },
        {
          name: 'Leather Crossbody Messenger Bag',
          description: 'Handcrafted genuine leather messenger bag with multiple compartments. Durable design suited for workspace and daily travel.',
          price: 3200.00,
          image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
          category: 'Accessories',
          stock: 30
        },
        {
          name: 'Elegant Designer Salwar Kameez',
          description: 'Gorgeous Anarkali style georgette salwar kameez set with heavy embroidery work and a matching chiffon dupatta.',
          price: 4200.00,
          image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
          category: 'Salwar Kameez',
          stock: 20
        },
        {
          name: 'Porao Comfort Cotton Kurti',
          description: 'Lightweight linen-cotton printed kurti. Elegant digital prints with styling buttons on the front placket.',
          price: 1800.00,
          image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
          category: 'Kurti',
          stock: 35
        },
        {
          name: 'Porao Signature Canvas Cap',
          description: 'Adjustable strap-back baseball cap made with durable washed cotton canvas. Features Porao logo embroidered at the front.',
          price: 650.00,
          image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
          category: 'Accessories',
          stock: 100
        }
      ];

      for (const p of sampleProducts) {
        await run(
          'INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
          [p.name, p.description, p.price, p.image_url, p.category, p.stock]
        );
      }
      console.log('Sample products seeded successfully.');
    }
  } catch (err) {
    console.error('Initialization error:', err.message);
  }
}

module.exports = {
  db,
  query,
  run,
  get
};
