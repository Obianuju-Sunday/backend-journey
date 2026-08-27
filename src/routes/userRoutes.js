const express = require('express');
const router = express.Router();
const { getStudentProfile, getOrgProfile, updateStudentProfile, updateOrgProfile, getStudentProfilePublic, getOrgProfilePublic } = require('../controllers/userController');
const { authMiddleware, isStudent, isOrganisation } = require('../middleware/auth');

// Protected - manage own profile
router.get('/student/profile', authMiddleware, isStudent, getStudentProfile);
router.put('/student/profile', authMiddleware, isStudent, updateStudentProfile);
router.get('/organisation/profile', authMiddleware,  isOrganisation,  getOrgProfile);
router.put('/organisation/profile', authMiddleware, isOrganisation, updateOrgProfile);


// Public - view profiles
router.get('/student/:id', getStudentProfilePublic);
router.get('/organisation/:id', getOrgProfilePublic);

module.exports = router;