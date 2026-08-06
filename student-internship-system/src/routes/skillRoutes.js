const express = require('express');
const router = express.Router();
const { addStudentSkill, getStudentSkills, updateStudentSkill, deleteStudentSkill, getAllStudentSkills } = require('../controllers/skillController');
const { authMiddleware, isStudent } = require('../middleware/auth');

// Public
router.get('/all', getAllStudentSkills);

// Student only
router.post('/add', authMiddleware, isStudent, addStudentSkill);
router.get('/my-skills', authMiddleware, isStudent, getStudentSkills);
router.put('/:id', authMiddleware, isStudent, updateStudentSkill);
router.delete('/:id', authMiddleware, isStudent, deleteStudentSkill);

module.exports = router;