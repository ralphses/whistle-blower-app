import { updateReportStatusToInvestigating, updateReportStatusToTurnedDown } from './report.model.js';
import * as reportRepository from './report.repository.js';

// Create a new report
const createReport = async (reportData) => {
  return await reportRepository.createReport(reportData);
};

// Get a report by ID
const getReportById = async (id) => {
  const report = await reportRepository.getReportById(id);
  if (!report) throw new Error('Report not found');
  return report;
};

// Get all reports for a specific agency
const getReportsByAgency = async (agencyId) => {
  return await reportRepository.getReportsByAgency(agencyId);
};

// Mark a report as processed
const markReportAsProcessed = async (id) => {
  await reportRepository.markReportAsProcessed(id);
};

// Service to update report status to "Investigating"
const investigateReport = async (reportId) => {
  const result = await updateReportStatusToInvestigating(reportId);
  if (result.affectedRows === 0) {
    throw new Error('Report not found');
  }
  return { message: 'Report status updated to Investigating' };
};

// Service to update report status to "Turned Down"
const turnDownReport = async (reportId) => {
  const result = await updateReportStatusToTurnedDown(reportId);
  if (result.affectedRows === 0) {
    throw new Error('Report not found');
  }
  return { message: 'Report status updated to Turned Down' };
};

export {investigateReport, turnDownReport, createReport, getReportById, getReportsByAgency, markReportAsProcessed };
