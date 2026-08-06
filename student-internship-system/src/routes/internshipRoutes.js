const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, getOrgInternships, deleteInternship } = require('../controllers/internshipController');
const { authMiddleware, isOrganization } = require('../middleware/auth');
 
// Create internship (protected - orgs only)
router.post('/create', authMiddleware, isOrganization, createInternship);
 
// Get all internships (anyone can view)
router.get('/all', getAllInternships);

// View internship postings (protected - orgs only) 
router.get('/org', authMiddleware, isOrganization, getOrgInternships)
 
// Delete internship (protected - orgs only)
// router.post('/delete/:id', authMiddleware, isOrganization, deleteInternship);

module.exports = router;