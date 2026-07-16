const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, deleteInternship } = require('../controllers/internshipController');
const { authMiddleware, isOrganization } = require('../middleware/auth');

// Create internship (protected - orgs only)
router.post('/create', authMiddleware, isOrganization, createInternship);

// Get all internships (anyone can view)
router.get('/all', getAllInternships);

// Delete internship (protected - orgs only)
router.post('/delete/:id', authMiddleware, isOrganization, deleteInternship);


// router.post('/internships/:id/delete', isOrg, async (req, res) => {
//   await pool.query('DELETE FROM internships WHERE id = $1', [req.params.id]);
//   res.redirect('/dashboard');
// });
module.exports = router;