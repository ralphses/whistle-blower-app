// server.js

import app from './src/app.js';
import { port } from './src/config/env.js';
// import runMigrations from './src/scripts/runMigrations.js';
// import './src/scripts/runMigrations.js';

// Start the server
// runMigrations();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
