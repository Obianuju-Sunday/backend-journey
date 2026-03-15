const express = require('express');
const router = express.Router();
const { registerStudent, registerOrganization, login } = require('../controllers/authController');
const { studentRegisterValidator, orgRegisterValidator, loginValidator } = require('../middleware/validators');

// Student registration
router.post('/register/student', studentRegisterValidator, registerStudent);

// Organization registration
router.post('/register/organization', orgRegisterValidator, registerOrganization);

// Login (both types)
router.post('/login', loginValidator, login);

module.exports = router;