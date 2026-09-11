const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, getOrgInternships, deleteInternship } = require('../controllers/internshipController');
const { authMiddleware, isOrganisation } = require('../middleware/auth');
const { createInternshipValidator } = require('../middleware/validators');
 
// Protected routes
router.post('/create', authMiddleware, isOrganisation, createInternshipValidator, createInternship);router.get('/org', authMiddleware, isOrganisation, getOrgInternships);
router.delete('/delete/:id', authMiddleware, isOrganisation, deleteInternship);


// Public routes
router.get('/all', getAllInternships);
 

module.exports = router;