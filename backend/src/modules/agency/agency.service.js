// src/modules/agency/agency.service.js

import * as agencyRepository from './agency.repository.js';
import { hashPassword, verifyPassword } from './agency.model.js';
import { generateToken } from '../../shared/utils/jwt.js';

// Register a new agency
const createAgency = async (agencyData) => {
  const hashedPassword = await hashPassword(agencyData.password);
  const agency = { ...agencyData, password: hashedPassword };
  return await agencyRepository.createAgency(agency);
};

// Authenticate an agency
const authenticateAgency = async (email, password) => {
  const agency = await agencyRepository.getAgencyByEmail(email);
  if (!agency) throw new Error('Agency not found');
  const isPasswordValid = await verifyPassword(password, agency.password);
  if (!isPasswordValid) throw new Error('Invalid password');
  const token = generateToken(agency);
  return { agency, token };
};

// Get all agencies
const getAllAgencies = async () => {
  return await agencyRepository.getAllAgencies();
};

// Get an agency by ID
const getAgencyById = async (id) => {
  const agency = await agencyRepository.getAgencyById(id);
  if (!agency) throw new Error('Agency not found');
  return agency;
};

// Update an agency
const updateAgency = async (id, agencyData) => {
  const existingAgency = await agencyRepository.getAgencyById(id);
  if (!existingAgency) throw new Error('Agency not found');
  if (agencyData.password) {
    agencyData.password = await hashPassword(agencyData.password);
  }
  await agencyRepository.updateAgency(id, agencyData);
};

// Delete an agency
const deleteAgency = async (id) => {
  const existingAgency = await agencyRepository.getAgencyById(id);
  if (!existingAgency) throw new Error('Agency not found');
  await agencyRepository.deleteAgency(id);
};

export { createAgency, authenticateAgency, getAllAgencies, getAgencyById, updateAgency, deleteAgency };
