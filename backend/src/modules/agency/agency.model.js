// src/modules/agency/agency.model.js

import bcrypt from 'bcrypt';
import { dbConnection } from '../../config/config.js';

// Define the Agency model schema
const createTable = async () => {
  const connection = await dbConnection.getConnection();
  await connection.query(`
    CREATE TABLE IF NOT EXISTS agency (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

// Hash the password before saving
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Create the agency table if it doesn't exist
createTable().catch((err) => console.error('Table creation failed:', err));

export { hashPassword, verifyPassword };
