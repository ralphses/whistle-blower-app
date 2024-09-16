import * as reportModel from './report.model.js';
import * as whistleblowerRepository from '../whistleblower/whistleblower.repository.js';

// Create a new report
const createReport = async (reportData) => {
  const { wallet_address, ...reportFields } = reportData;

  // Check if the whistleblower exists
  let whistleblower = await whistleblowerRepository.getWhistleblowerByWalletAddress(wallet_address);

  // If not, create a new whistleblower
  if (!whistleblower) {
    const newWhistleblowerId = await whistleblowerRepository.createWhistleblower({ wallet_address });
    whistleblower = await whistleblowerRepository.getWhistleblowerByWalletAddress(wallet_address);
    reportFields.whistleblower_id = whistleblower.id;
  } else {
    reportFields.whistleblower_id = whistleblower.id;
  }

  // Create the report
  return await reportModel.createReport(reportFields);
};

// Get a report by ID
const getReportById = async (id) => {
  return await reportModel.getReportById(id);
};

// Get all reports for a specific agency
const getReportsByAgency = async (agencyId) => {
  return await reportModel.getReportsByAgency(agencyId);
};

// Mark a report as processed
const markReportAsProcessed = async (id) => {
  return await reportModel.markReportAsProcessed(id);
};

export { createReport, getReportById, getReportsByAgency, markReportAsProcessed };
