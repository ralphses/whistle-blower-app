// src/config/config.js

import mysql from 'mysql2/promise';
import { db } from './env.js';

// Create MySQL connection pool
const dbConnection = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export dbConnection for use in app.js
export { dbConnection };
