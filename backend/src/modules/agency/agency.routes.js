// src/modules/agency/agency.routes.js

import express from 'express';
import {
  registerAgency,
  authenticateAgency,
  getAllAgencies,
  getAgencyById,
  updateAgency,
  deleteAgency
} from './agency.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';

const router = express.Router();

// Register a new agency (no authentication required)
router.post('/register', registerAgency);

// Authenticate an agency (no authentication required)
router.post('/login', authenticateAgency);

// Apply authentication middleware to the rest of the routes
router.use(authMiddleware);

// Get all agencies (authentication required)
router.get('/', getAllAgencies);

// Get an agency by ID (authentication required)
router.get('/:id', getAgencyById);

// Update an agency by ID (authentication required)
router.put('/:id', updateAgency);

// Delete an agency by ID (authentication required)
router.delete('/:id', deleteAgency);

export default router;
