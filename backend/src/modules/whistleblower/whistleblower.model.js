import { dbConnection } from '../../config/config.js';

// Define the Whistleblower model schema
const createTable = async () => {
  const connection = await dbConnection.getConnection();
  await connection.query(`
    CREATE TABLE IF NOT EXISTS whistleblower (
      id INT AUTO_INCREMENT PRIMARY KEY,
      wallet_address VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

// Get a whistleblower by wallet address
const getWhistleblowerByWalletAddress = async (walletAddress) => {
  const [rows] = await dbConnection.query('SELECT * FROM whistleblower WHERE wallet_address = ?', [walletAddress]);
  return rows[0];
};

// Create a new whistleblower
const createWhistleblower = async (whistleblowerData) => {
  const { wallet_address } = whistleblowerData;
  const [result] = await dbConnection.query(
    'INSERT INTO whistleblower (wallet_address) VALUES (?)',
    [wallet_address]
  );
  return result.insertId;
};

// Get all whistleblowers
const getAllWhistleblowers = async () => {
  const [rows] = await dbConnection.query('SELECT * FROM whistleblower');
  return rows;
};

export { createTable, getWhistleblowerByWalletAddress, createWhistleblower, getAllWhistleblowers };
