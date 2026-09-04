const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, getOrgInternships, deleteInternship } = require('../controllers/internshipController');
const { authMiddleware, isOrganisation } = require('../middleware/auth');
 
// Protected routes
router.post('/create', authMiddleware, isOrganisation, createInternship);
router.get('/org', authMiddleware, isOrganisation, getOrgInternships);
// router.post('/delete/:id', authMiddleware, isOrganisation, deleteInternship);


// Public routes
router.get('/all', getAllInternships);
 

module.exports = router;