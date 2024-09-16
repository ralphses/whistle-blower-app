// server.js

import app from './src/app.js';
import { port } from './src/config/env.js';

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
