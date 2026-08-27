const express = require('express');
const router = express.Router();
const { registerStudent, registerOrganisation, login, logout, getCurrentUser } = require('../controllers/authController');
const { studentRegisterValidator, orgRegisterValidator, loginValidator } = require('../middleware/validators');
const { authMiddleware } = require('../middleware/auth');

// Registration
router.post('/register/student', studentRegisterValidator, registerStudent);
router.post('/register/organisation', orgRegisterValidator, registerOrganisation);

// Login/logout
router.post('/login', loginValidator, login);
router.post('/logout', authMiddleware, logout);

// Get current user info
router.get('/me', authMiddleware, getCurrentUser);


module.exports = router;