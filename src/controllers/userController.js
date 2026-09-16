const pool = require("../config/db");

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId

    const profile = await pool.query(
      `SELECT 
          sp.id,
          sp.full_name,
          sp.program,
          sp.year,
          sp.university,
          sp.bio,
          sp.phone,
          sp.location,
          sp.portfolio_link,
          sp.created_at,
          u.email
       FROM student_profiles sp
       JOIN users u ON sp.user_id = u.id
       WHERE sp.user_id = $1`,
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const studentProfileId = profile.rows[0].id;

    const skills = await pool.query(
      `SELECT
        s.skill_name,
        ss.proficiency
       FROM student_skills ss
       JOIN skills s ON ss.skill_id = s.id
       WHERE ss.student_id = $1
       ORDER BY s.skill_name`,
      [studentProfileId]
    );

    return res.status(200).json({
      ...profile.rows[0],
      skills: skills.rows
    });

  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getStudentProfilePublic = async (req, res) => {

  try {
    const studentId = req.params.id;

    const studentProfile = await pool.query(
      `SELECT 
          sp.id,
          sp.full_name,
          sp.program,
          sp.year,
          sp.phone,
          sp.location,
          sp.bio,
          sp.university,
          sp.portfolio_link,
          u.email
       FROM student_profiles sp
       JOIN users u ON sp.user_id = u.id
       WHERE sp.id = $1`,
      [studentId]
    );

    if (studentProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile not found'
      })
    }

    // Get student's skills
    const skills = await pool.query(
      `SELECT
        s.skill_name,
        ss.proficiency
      FROM student_skills ss
      JOIN skills s ON ss.skill_id = s.id
      WHERE ss.student_id = $1
      ORDER BY s.skill_name`,
      [studentId]
    );

    return res.status(200).json({
      ...studentProfile.rows[0],
      skills: skills.rows
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' });
  }
}

// Get organisation profile
const getOrgProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // JOIN users table to get email
    const profile = await pool.query(
      `SELECT 
        op.id,
        op.company_name,
        op.industry,
        op.location,
        op.website,
        op.niche,
        op.description,
        u.email
       FROM organisation_profiles op
       JOIN users u ON op.user_id = u.id
       WHERE op.user_id = $1`,
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getOrgProfilePublic = async (req, res) => {
  try {
    const orgId = req.params.id;

    const orgProfile = await pool.query('SELECT id, company_name, industry, niche, description, website, location FROM organisation_profiles WHERE id = $1', [orgId])

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Profile not found'
      })
    }

    return res.status(200).json(orgProfile.rows[0]);

  } catch (error) {
    console.error('Error getting org profile', error);
    res.status(500).json({
      error: 'Server error'
    })
  }
}

const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const allowedFields = ['full_name', 'bio', 'phone', 'location', 'portfolio_link', 'program', 'year', 'university'];
    const updateData = {};

    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value;
      }
    }

    const fields = [];
    const values = [];
    let placeholderIndex = 1;

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${placeholderIndex}`);
      values.push(value);
      placeholderIndex++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(userId);
    const query = `UPDATE student_profiles SET ${fields.join(', ')} WHERE user_id = $${placeholderIndex} RETURNING *`;

    const result = await pool.query(query, values);
    res.status(200).json({
      message: 'Profile updated',
      profile: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateOrgProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const allowedFields = ['company_name', 'industry', 'location', 'website', 'niche', 'description', 'contact_email'];
    const updateData = {};

    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value;
      }
    }

    const fields = [];
    const values = [];
    let placeholderIndex = 1;

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${placeholderIndex}`);
      values.push(value);
      placeholderIndex++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(userId);
    const query = `UPDATE organisation_profiles SET ${fields.join(', ')} WHERE user_id = $${placeholderIndex} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Organization profile not found' });
    }

    res.status(200).json({
      message: 'Profile updated',
      profile: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}




module.exports = {
  getStudentProfile,
  getOrgProfile,
  updateStudentProfile,
  updateOrgProfile,
  getStudentProfilePublic,
  getOrgProfilePublic
};