const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships } = require('../controllers/internshipController');
const { authMiddleware, isOrganization } = require('../middleware/auth');

// Create internship (protected - orgs only)
router.post('/create', authMiddleware, isOrganization, createInternship);

// Get all internships (anyone can view)
router.get('/all', getAllInternships);

module.exports = router;