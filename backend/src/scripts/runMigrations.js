import fs from 'fs';
import path from 'path';
import { dbConnection } from '../config/config.js';

const runMigrations = async () => {
  let connection;
  
  try {
    // Get a connection from the pool
    connection = await dbConnection.getConnection();
    
    // Path to the SQL migration file
    const migrationFilePath = path.resolve('src/migrations/V1__init.sql');
    const sql = fs.readFileSync(migrationFilePath, 'utf8');
    
    // Execute the SQL script
    await connection.query(sql);
    console.log('Migrations completed successfully.');
    
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export default runMigrations;
