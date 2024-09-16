// src/modules/agency/agency.controller.js

import * as agencyService from './agency.service.js';

// Register a new agency
const registerAgency = async (req, res) => {
  try {
    const agencyData = req.body;
    const agency = await agencyService.createAgency(agencyData);
    res.status(201).json({
      status: 'success',
      data: agency,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Authenticate an agency
const authenticateAgency = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { agency, token } = await agencyService.authenticateAgency(email, password);
    res.status(200).json({
      status: 'success',
      data: { agency, token },
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get all agencies
const getAllAgencies = async (req, res) => {
  try {
    const agencies = await agencyService.getAllAgencies();
    res.status(200).json({
      status: 'success',
      data: agencies,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get an agency by ID
const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await agencyService.getAgencyById(id);
    res.status(200).json({
      status: 'success',
      data: agency,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Update an agency
const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const agencyData = req.body;
    await agencyService.updateAgency(id, agencyData);
    res.status(200).json({
      status: 'success',
      message: 'Agency updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Delete an agency
const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;
    await agencyService.deleteAgency(id);
    res.status(200).json({
      status: 'success',
      message: 'Agency deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { registerAgency, authenticateAgency, getAllAgencies, getAgencyById, updateAgency, deleteAgency };
