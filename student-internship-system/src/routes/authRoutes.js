const express = require('express');
const router = express.Router();
const { registerStudent, registerOrganization, login } = require('../controllers/authController');
const { studentRegisterValidator, orgRegisterValidator, loginValidator } = require('../middleware/validators');


// GET routes to show forms
router.get('/register-student', (req, res) => {
  res.render('student-register');
});

router.get('/register-organization', (req, res) => {
  res.render('org-register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

// Student registration
router.post('/register/student', studentRegisterValidator, registerStudent);

// Organization registration
router.post('/register/organization', orgRegisterValidator, registerOrganization);

// Login (both types)
router.post('/login', loginValidator, login);

module.exports = router;