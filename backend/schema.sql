-- Tech Product Showcase — SQLite schema

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name    VARCHAR(150) NOT NULL,
    brand           VARCHAR(100) NOT NULL,
    category        VARCHAR(50)  NOT NULL,
    price           DECIMAL(10,2) NOT NULL,
    stock_quantity  INTEGER DEFAULT 0,
    description     TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, brand, category, price, stock_quantity, description) VALUES
('iPhone 15 Pro',        'Apple',    'Phone',    1199.99, 45,  'Titanium body, A17 Pro chip, 256GB storage'),
('Galaxy S24 Ultra',     'Samsung',  'Phone',    1299.00, 30,  'Snapdragon 8 Gen 3, 200MP camera, S-Pen included'),
('MacBook Air M3',       'Apple',    'Laptop',   1099.00, 22,  '13-inch, M3 chip, 8GB RAM, 256GB SSD'),
('Dell XPS 15',          'Dell',     'Laptop',   1799.50, 15,  'Intel Core i7, 16GB RAM, 512GB SSD, OLED display'),
('iPad Pro 12.9',        'Apple',    'Tablet',    999.99, 40,  'M2 chip, Liquid Retina XDR display, 128GB'),
('Sony WH-1000XM5',      'Sony',     'Audio',     399.99, 60,  'Industry-leading noise cancellation, 30hr battery'),
('AirPods Pro 2',        'Apple',    'Audio',     249.00, 100, 'Active noise cancellation, USB-C charging case'),
('Logitech MX Master 3', 'Logitech', 'Accessory',  99.99, 75,  'Wireless mouse, 4000 DPI, multi-device pairing'),
('Samsung 980 Pro 1TB',  'Samsung',  'Storage',   129.99, 55,  'NVMe SSD, PCIe 4.0, up to 7000 MB/s read'),
('Anker 65W Charger',    'Anker',    'Accessory',  49.99, 200, 'GaN fast charger, 3 ports, compact design');