const pool = require("../config/db");


// Add a new skill for a student
const addStudentSkill = async (req, res) => {
  res.json({ message: 'Coming soon' });

}

//  Get all skills for a specific student
const getStudentSkills = async (req, res) => {
  res.json({ message: 'Coming soon' });

}

// Update a specific skill for a student
const updateStudentSkill = async (req, res) => {
  res.json({ message: 'Coming soon' });

}

// Delete a specific skill for a student
const deleteStudentSkill = async (req, res) => {
  res.json({ message: 'Coming soon' });

}

// Get all skills for all students (for admin)
const getAllStudentSkills = async (req, res) => {
  res.json({ message: 'Coming soon' });
}

module.exports = {
  addStudentSkill,
  getStudentSkills,
  updateStudentSkill,
  deleteStudentSkill,
  getAllStudentSkills
};