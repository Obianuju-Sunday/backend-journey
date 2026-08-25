const pool = require('../config/db');

// Get all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await pool.query('SELECT id, skill_name FROM skills ORDER by skill_name');

    if (skills.rows.length === 0) {
      return res.status(200).json({
        skills: [],
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

  const { skill_id, proficiency } = req.body;
  const userId = req.user.userId;
  try {
    const studentProfile = await pool.query('SELECT id FROM student_profiles WHERE user_id = $1', [userId]);
    const student_id = studentProfile.rows[0].id;

    if (studentProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile does not exist.'
      })
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(proficiency)) {
      return res.status(400).json({
        error: 'Proficiency level can only be beginner, intermediate or advanced.'
      })
    }

    const skill = await pool.query('SELECT id FROM skills WHERE id = $1', [skill_id]);
    if (skill.rows.length === 0) {
      return res.status(400).json({
        error: 'skill does not exist'
      })
    }

    const result = await pool.query('INSERT INTO student_skills (student_id, skill_id, proficiency) VALUES ($1, $2, $3) RETURNING *', [student_id, skill_id, proficiency])
    res.status(201).json({
      message: 'Skill added successfully.',
      skill: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get student's skills
const getStudentSkills = async (req, res) => {
  const userId = req.user.userId;
  try {
    const studentProfile = await pool.query('SELECT id FROM student_profiles WHERE user_id = $1', [userId])
    const student_id = studentProfile.rows[0].id;

    if (studentProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile does not exist.'
      })
    }

    const studentSkills = await pool.query('SELECT ss.id, ss.student_id, ss.skill_id, s.skill_name, ss.proficiency FROM student_skills ss JOIN skills s ON ss.skill_id = s.id WHERE ss.student_id = $1', [student_id])

    res.status(200).json({
      skills: studentSkills.rows
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update skill proficiency
const updateStudentSkill = async (req, res) => {
  const studentSkillId = req.params.id;
  const { proficiency } = req.body;
  const userId = req.user.userId;
  try {
    const studentProfile = await pool.query('SELECT id from student_profiles WHERE user_id = $1', [userId])
    const student_id = studentProfile.rows[0].id;

    if (studentProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile does not exist.'
      })
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(proficiency)) {
      return res.status(404).json({
        error: 'Proficiency level can only be beginner, intermediate or advanced.'
      })
    }

    const studentSkill = await pool.query('SELECT id, student_id FROM student_skills WHERE id = $1 AND student_id = $2', [studentSkillId, student_id])
    if (studentSkill.rows.length === 0) {
      return res.status(403).json({
        error: 'You can only update your own skills'
      })
    }

    const updatedSkill = await pool.query('UPDATE student_skills SET proficiency = $1 WHERE id = $2 AND student_id = $3 RETURNING *', [proficiency, studentSkillId, student_id])

    res.status(200).json({
      message: 'Skill updated successfully',
      skill: updatedSkill.rows
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete skill
const deleteStudentSkill = async (req, res) => {

  const studentSkillId = req.params.id;
  const userId = req.user.userId;
  try {
    const studentProfile = await pool.query('SELECT id FROM student_profiles WHERE user_id = $1', [userId])
    const student_id = studentProfile.rows[0].id;

    if (studentProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile does not exist.'
      })
    }

    const studentSkill = await pool.query('SELECT id, student_id FROM student_skills WHERE id = $1 AND student_id =$2', [studentSkillId, student_id])
    if (studentSkill.rows.length === 0) {
      return res.status(403).json({
        error: 'You can only delete your own skills'
      })
    }

    const result = await pool.query('DELETE FROM student_skills WHERE id = $1 AND student_id = $2 RETURNING *', [studentSkillId, student_id])

    res.status(200).json({
      message: 'Skill deleted successfully'
    })

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