// db.js
require('dotenv').config();
const Database = require('better-sqlite3');

const db = new Database(process.env.DB_FILE || 'database.db');
db.pragma('journal_mode = WAL');

console.log(`✅ Connected to SQLite database: ${process.env.DB_FILE || 'database.db'}`);

module.exports = db;