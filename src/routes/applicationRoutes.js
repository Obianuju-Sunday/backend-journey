const express = require('express');
const router = express.Router();
const { applyToInternship, getMyApplications } = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');
const { isOrganisation } = require('../middleware/auth');
const { getOrgApplications, updateApplicationStatus } = require('../controllers/applicationController');

// Apply to internship
router.post('/apply', authMiddleware, applyToInternship);

// Get my applications
router.get('/my-applications', authMiddleware, getMyApplications);

// Org routes
router.get('/organisation/applications', authMiddleware, isOrganisation, getOrgApplications);
router.put('/update-status', authMiddleware, isOrganisation, updateApplicationStatus);

module.exports = router;