// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/products — List all products
app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id — Get one product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products — Create a new product
app.post('/api/products', (req, res) => {
  try {
    const { product_name, brand, category, price, stock_quantity, description } = req.body;

    if (!product_name || !brand || !category || price === undefined) {
      return res.status(400).json({ error: 'product_name, brand, category, and price are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO products (product_name, brand, category, price, stock_quantity, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(product_name, brand, category, price, stock_quantity || 0, description || null);
    const created = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
    
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id — Update an existing product
app.put('/api/products/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { product_name, brand, category, price, stock_quantity, description } = req.body;

    const stmt = db.prepare(`
      UPDATE products
      SET product_name = ?, brand = ?, category = ?, price = ?,
          stock_quantity = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      product_name ?? existing.product_name,
      brand ?? existing.brand,
      category ?? existing.category,
      price ?? existing.price,
      stock_quantity ?? existing.stock_quantity,
      description ?? existing.description,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id — Delete a product
app.delete('/api/products/:id', (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted', id: Number(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve the frontend files (This is what makes deployment work!)
app.use(express.static(path.join(__dirname, '../frontend')));

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});