// src/modules/agency/agency.repository.js

import { dbConnection } from '../../config/config.js';

// Create a new agency
const createAgency = async (agencyData) => {
  const { name, email, password } = agencyData;
  const [result] = await dbConnection.query(
    'INSERT INTO agency (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result.insertId;
};

// Get all agencies
const getAllAgencies = async () => {
  const [rows] = await dbConnection.query('SELECT * FROM agency');
  return rows;
};

// Get an agency by ID
const getAgencyById = async (id) => {
  const [rows] = await dbConnection.query('SELECT * FROM agency WHERE id = ?', [id]);
  return rows[0];
};

// Update an agency by ID
const updateAgency = async (id, agencyData) => {
  const { name, email, password } = agencyData;
  await dbConnection.query(
    'UPDATE agency SET name = ?, email = ?, password = ? WHERE id = ?',
    [name, email, password, id]
  );
};

// Delete an agency by ID
const deleteAgency = async (id) => {
  await dbConnection.query('DELETE FROM agency WHERE id = ?', [id]);
};

// Get an agency by email
const getAgencyByEmail = async (email) => {
  const [rows] = await dbConnection.query('SELECT * FROM agency WHERE email = ?', [email]);
  return rows[0];
};

export { createAgency, getAllAgencies, getAgencyById, updateAgency, deleteAgency, getAgencyByEmail };
