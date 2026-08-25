const express = require('express');
const router = express.Router();
const { getStudentProfile, getOrgProfile, updateStudentProfile, updateOrgProfile } = require('../controllers/userController');
const { authMiddleware, isStudent, isOrganization } = require('../middleware/auth');

// Protected - manage own profile
router.get('/student/profile', authMiddleware, isStudent, getStudentProfile);
router.put('/student/profile', authMiddleware, isStudent, updateStudentProfile);
router.get('/organisation/profile', getOrgProfile);
router.put('/organisation/profile', authMiddleware, isOrganization, updateOrgProfile);


// Public - view profiles
router.get('/student/:id', getStudentProfile);
router.get('/organisation/:id', getOrgProfile);

module.exports = router;