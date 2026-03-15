const express = require('express');
const router = express.Router();
const { applyToInternship, getMyApplications } = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');

// Apply to internship
router.post('/apply', authMiddleware, applyToInternship);

// Get my applications
router.get('/my-applications', authMiddleware, getMyApplications);

module.exports = router;