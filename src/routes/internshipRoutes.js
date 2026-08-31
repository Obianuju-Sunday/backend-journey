const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, getOrgInternships, deleteInternship } = require('../controllers/internshipController');
const { authMiddleware, isOrganisation } = require('../middleware/auth');


router.get('/org', authMiddleware, isOrganisation, (req, res) => {
  res.render('org/dashboard');
});
 
// Create internship (protected - orgs only)
router.post('/create', authMiddleware, isOrganisation, createInternship);
 
// Get all internships for students (public)
router.get('/all', getAllInternships);

// View internship postings (protected - orgs only) 
router.get('/org', authMiddleware, isOrganisation, getOrgInternships)
 
// Delete internship (protected - orgs only)
// router.post('/delete/:id', authMiddleware, isOrganisation, deleteInternship);

module.exports = router;