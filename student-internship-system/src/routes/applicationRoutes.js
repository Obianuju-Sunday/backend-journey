const express = require('express');
const router = express.Router();
const { applyToInternship, getMyApplications } = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');
const { isOrganization } = require('../middleware/auth');
const { getOrgApplications, updateApplicationStatus } = require('../controllers/applicationController');

// Apply to internship
router.post('/apply', authMiddleware, applyToInternship);

// Get my applications
router.get('/my-applications', authMiddleware, getMyApplications);

// Org routes (add these at the bottom before module.exports)
router.get('/organization/applications', authMiddleware, isOrganization, getOrgApplications);
router.put('/update-status', authMiddleware, isOrganization, updateApplicationStatus);

module.exports = router;