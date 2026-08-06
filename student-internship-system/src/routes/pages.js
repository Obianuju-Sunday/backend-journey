const express = require('express');
const router = express.Router();

// GET routes to show forms
router.get('/register/student', (req, res) => {
  res.render('auth/registerStudent');
});

router.get('/register/organization', (req, res) => {
  res.render('auth/registerOrganisation');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

module.exports = router;