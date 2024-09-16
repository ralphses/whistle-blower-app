// src/config/env.js

import { config } from 'dotenv';

// Load .env file based on the NODE_ENV
config({ path: `.env` });

export const port = process.env.PORT || 5000;
export const nodeEnv = process.env.NODE_ENV || 'development';
export const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

export const jwtSecret = process.env.JWT_SECRET;
