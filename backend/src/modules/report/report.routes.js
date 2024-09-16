import express from 'express';
import {
  createReport,
  getReportById,
  getReportsByAgency,
  markReportAsProcessed,
  handleInvestigateReport,  // Import new method
  handleTurnDownReport     // Import new method
} from './report.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';

const router = express.Router();

// Create a new report (authentication required)
router.post('/', createReport);

router.use(authMiddleware);

// Get all reports for the authenticated agency (authentication required)
// Updated route to use the authenticated agency
router.get('/agency', async (req, res, next) => {
  try {
    const agencyId = req.user.id; // Assuming the token payload contains the user ID
    await getReportsByAgency(req, res, agencyId);
  } catch (error) {
    next(error);
  }
});

// Get all reports for a specific agency (authentication required)
router.get('/agency/:agencyId', getReportsByAgency);
router.get('/view/one/:id', getReportById);

// Mark a report as processed (authentication required)
router.put('/:id/process', markReportAsProcessed);

// Investigate a report (authentication required)
router.put('/:reportId/investigate', handleInvestigateReport);

// Turn down a report (authentication required)
router.put('/:reportId/turn-down', handleTurnDownReport);

export default router;
