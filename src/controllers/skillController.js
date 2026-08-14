const pool = require('../config/db');

// Get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await pool.query('SELECT id, skill_name FROM skills ORDER by skill_name');

    if(skills.rows.length === 0){
      return res.status(200).json({
        skills : [],
        message: 'No skills available yet'
      })
    }

    res.status(200).json({
      skills: skills.rows
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add skill to student
const addStudentSkill = async (req, res) => {
  try {
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get student's skills
const getStudentSkills = async (req, res) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update skill proficiency
const updateStudentSkill = async (req, res) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete skill
const deleteStudentSkill = async (req, res) => {
  try {
    // YOUR CODE HERE
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllSkills,
  addStudentSkill,
  getStudentSkills,
  updateStudentSkill,
  deleteStudentSkill
};