

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { getStudentProfile, getOrgProfile } = require('../controllers/authController');

router.get('/student/dashboard', (req, res) => {
  res.render('student-dashboard');
});

router.get('/organization/dashboard', (req, res) => {
  res.render('org-dashboard');
});

// Profile endpoints
router.get('/student/profile', authMiddleware, getStudentProfile);
router.get('/organization/profile', authMiddleware, getOrgProfile);

module.exports = router;