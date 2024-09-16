import { dbConnection } from '../../config/config.js';

// Get a whistleblower by wallet address
const getWhistleblowerByWalletAddress = async (walletAddress) => {
  const [rows] = await dbConnection.query('SELECT * FROM whistleblower WHERE wallet_address = ?', [walletAddress]);
  return rows[0];  // Return the first matching record, if any
};

// Create a new whistleblower
const createWhistleblower = async (whistleblowerData) => {
  const { wallet_address } = whistleblowerData;
  const [result] = await dbConnection.query('INSERT INTO whistleblower (wallet_address) VALUES (?)', [wallet_address]);
  return result.insertId; // Return the ID of the newly created whistleblower
};

// Other methods remain the same
const getAllWhistleblowers = async () => {
  const [rows] = await dbConnection.query('SELECT * FROM whistleblower');
  return rows;
};

const getWhistleblowerById = async (id) => {
  const [rows] = await dbConnection.query('SELECT * FROM whistleblower WHERE id = ?', [id]);
  return rows[0];
};

export { getWhistleblowerByWalletAddress, createWhistleblower, getAllWhistleblowers, getWhistleblowerById };
