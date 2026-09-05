const express = require('express');
const router = express.Router();
const { authMiddleware, isOrganisation } = require('../middleware/auth');
const { getOrgApplications, updateApplicationStatus, applyToInternship, getMyApplications, getApplicationDetails } = require('../controllers/applicationController');

// student routes
router.post('/apply', authMiddleware, applyToInternship);
router.get('/my-applications', authMiddleware, getMyApplications);

// Org routes
router.get('/organisation/applications', authMiddleware, isOrganisation, getOrgApplications);
router.put('/update-status', authMiddleware, isOrganisation, updateApplicationStatus);
router.get('/:id', authMiddleware, isOrganisation, getApplicationDetails);


module.exports = router;