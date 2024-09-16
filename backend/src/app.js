// src/app.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './config/config.js';
import errorHandler from './shared/middlewares/errorHandler.js';
import authMiddleware from './shared/middlewares/authMiddleware.js';
import logger from './shared/utils/logger.js';

// Import routes from modules
// import whistleblowerRoutes from './modules/whistleblower/whistleblower.routes.js';
import agencyRoutes from './modules/agency/agency.routes.js';
import { authenticateAgency, registerAgency } from './modules/agency/agency.controller.js';
import reportRoutes from './modules/report/report.routes.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Test DB connection
dbConnection.getConnection()
  .then(() => logger.info('Database connected'))
  .catch((err) => logger.error('Database connection failed:', err));

// Routes without authentication middleware
app.use('/api/agencies/register', registerAgency);
app.use('/api/agencies/login', authenticateAgency);

// Use authentication middleware for protected routes
// app.use('/api/whistleblowers', authMiddleware, whistleblowerRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/reports', reportRoutes);

// Global error handler
app.use(errorHandler);

export default app;
