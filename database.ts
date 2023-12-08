import { Database } from 'sqlite3';

try {
  const db = new Database(':memory:');
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY,
      product_name TEXT NOT NULL,
      price REAL NOT NULL,
      stock_quantity INTEGER NOT NULL,
      barcode TEXT UNIQUE,
      category TEXT
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY,
      customer_name TEXT NOT NULL,
      email TEXT,
      phone_number TEXT,
      address TEXT
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      sale_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount REAL NOT NULL,
      payment_method TEXT,
      notes TEXT,
      user_id INTEGER,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS sale_items (
      sale_item_id INTEGER PRIMARY KEY,
      sale_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      item_amount REAL NOT NULL,
      FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id INTEGER PRIMARY KEY,
      employee_name TEXT NOT NULL,
      role TEXT
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS shifts (
      shift_id INTEGER PRIMARY KEY,
      employee_id INTEGER,
      start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      end_time TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS warehouse_inventory (
      warehouse_inventory_id INTEGER PRIMARY KEY,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount REAL NOT NULL,
      payment_method TEXT,
      notes TEXT,
      user_id INTEGER,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      order_item_id INTEGER PRIMARY KEY,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      item_amount REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(order_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`);
} catch (error) {
  console.error("Error occurred: " + error.message);
}