const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { 
    console.log('✅ authMiddleware called');

  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decoded:', decoded);

    req.user = decoded;
    next();
  } catch (err) {
        console.log('❌ Token error:', err.message);

    return res.status(401).json({ error: 'Invalid token' });
  }
};

const isOrganization = (req, res, next) => {
  if (req.user.role !== 'organization') {
    return res.status(403).json({ error: 'Access denied. Organizations only.' });
  }
  next();
};

const isStudent = (req, res, next) => {
    console.log('✅ isStudent called');
  console.log('User object:', req.user);
  console.log('User role:', req.user.role);
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Students only.' });
  }
    console.log('✅ Role check passed');

  next();
};

module.exports = { authMiddleware, isOrganization, isStudent };