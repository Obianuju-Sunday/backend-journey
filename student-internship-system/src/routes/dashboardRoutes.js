
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

router.get('/student/dashboard', (req, res) => {
  res.render('student-dashboard');
});

router.get('/organization/dashboard', (req, res) => {
  res.render('org-dashboard');
});

module.exports = router;