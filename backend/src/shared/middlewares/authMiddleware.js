// src/shared/middlewares/authMiddleware.js

import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/env.js';  // Make sure to define jwtSecret in env.js

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  
  // Check if authorization header is present and starts with 'Bearer '
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1];
    
    // Verify the JWT token
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        // If token is invalid or verification fails
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // If token is valid, attach decoded information to request object
      req.user = decoded;
      next();
    });
  } else {
    // If authorization header is missing or doesn't start with 'Bearer '
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
