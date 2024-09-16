import * as reportService from './report.service.js';

// Create a new report
const createReport = async (req, res) => {
  try {
    const reportData = req.body;
    const newReportId = await reportService.createReport(reportData);
    res.status(201).json({ message: 'Report created successfully', reportId: newReportId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await reportService.getReportById(id);
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: 'Report not found' });
  }
};

// Get all reports for a specific agency
const getReportsByAgency = async (req, res, userId) => {
  try {
    const { agencyId } = req.params;

    // Use the agencyId if present, otherwise fall back to userId
    const reports = await reportService.getReportsByAgency(agencyId || userId);

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'An error occurred while fetching reports' });
  }
};


// Mark a report as processed
const markReportAsProcessed = async (req, res) => {
  try {
    const { id } = req.params;
    await reportService.markReportAsProcessed(id);
    res.status(200).json({ message: 'Report marked as processed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Investigate a report
const handleInvestigateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const result = await reportService.investigateReport(reportId);
    
    res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error) {

    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Turn down a report
const handleTurnDownReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const result = await reportService.turnDownReport(reportId);
    res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export { handleTurnDownReport, handleInvestigateReport, createReport, getReportById, getReportsByAgency, markReportAsProcessed };
