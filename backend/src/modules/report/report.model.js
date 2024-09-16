import { dbConnection } from '../../config/config.js';

// Define the Report model schema
const createTable = async () => {
  const connection = await dbConnection.getConnection();
  await connection.query(`
    CREATE TABLE IF NOT EXISTS report (
      id INT AUTO_INCREMENT PRIMARY KEY,
      whistleblower_id INT,
      report_statement TEXT NOT NULL,
      location VARCHAR(255) NOT NULL,
      recipient_agency INT NOT NULL,
      file_url VARCHAR(255),
      status ENUM('created', 'processed') DEFAULT 'created',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (whistleblower_id) REFERENCES whistleblower(id),
      FOREIGN KEY (recipient_agency) REFERENCES agency(id)
    )
  `);
};

// Create a new report
const createReport = async (reportData) => {
  const { whistleblower_id, report_statement, location, recipient_agency, file_url, status } = reportData;
  const [result] = await dbConnection.query(
    'INSERT INTO report (whistleblower_id, report_statement, location, recipient_agency, file_url, status) VALUES (?, ?, ?, ?, ?, ?)',
    [whistleblower_id, report_statement, location, recipient_agency, file_url, status]
  );
  return result.insertId;
};

// Get a report by ID
const getReportById = async (id) => {
  const [rows] = await dbConnection.query('SELECT * FROM report WHERE id = ?', [id]);
  return rows[0];
};

// Get all reports for a specific agency
const getReportsByAgency = async (agencyId) => {
  const [rows] = await dbConnection.query('SELECT * FROM report WHERE recipient_agency = ?', [agencyId]);
  return rows;
};

// Mark a report as processed
const markReportAsProcessed = async (id) => {
  await dbConnection.query('UPDATE report SET status = "processed" WHERE id = ?', [id]);
};

// Update report status to "Investigating"
const updateReportStatusToInvestigating = async (reportId) => {
  const [result] = await dbConnection.query(
    'UPDATE report SET status = ? WHERE id = ?',
    ['investigating', reportId]
  );
  return result;
};

// Update report status to "Turned Down"
const updateReportStatusToTurnedDown = async (reportId) => {
  const [result] = await dbConnection.query(
    'UPDATE report SET status = ? WHERE id = ?',
    ['turned down', reportId]
  );
  return result;
};

export { createTable, createReport, getReportById, getReportsByAgency, markReportAsProcessed, updateReportStatusToInvestigating,  updateReportStatusToTurnedDown };
