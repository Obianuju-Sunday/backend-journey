const express = require('express');
const router = express.Router();
const { getStudentProfile, getOrgProfile, updateStudentProfile, updateOrgProfile, getStudentProfilePublic, getOrgProfilePublic } = require('../controllers/userController');
const { authMiddleware, isStudent, isOrganisation, updateStudentProfileValidator, updateOrgProfileValidator } = require('../middleware/auth');

// Protected - manage own profile
router.get('/student/profile', authMiddleware, isStudent, getStudentProfile);
router.put('/student/profile', authMiddleware, isStudent, updateStudentProfileValidator, updateStudentProfile);
router.get('/organisation/profile', authMiddleware,  isOrganisation,  getOrgProfile);
router.put('/organisation/profile', authMiddleware, isOrganisation, updateOrgProfileValidator, updateOrgProfile);


// Public - view profiles
router.get('/student/:id', getStudentProfilePublic);
router.get('/organisation/:id', getOrgProfilePublic);

module.exports = router;