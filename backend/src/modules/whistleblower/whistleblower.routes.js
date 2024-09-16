import express from 'express';
import {
  registerWhistleblower,
  getAllWhistleblowers,
  getWhistleblowerByWalletAddress
} from './whistleblower.controller.js';

const router = express.Router();

// Register a new whistleblower (no authentication required)
router.post('/register', registerWhistleblower);

// Get all whistleblowers (authentication required)
router.get('/', getAllWhistleblowers);

// Get a whistleblower by wallet address (authentication required)
router.get('/:wallet_address', getWhistleblowerByWalletAddress);

export default router;
