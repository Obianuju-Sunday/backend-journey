const pool = require("../config/db");

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId

    const profile = await pool.query('SELECT id, full_name, program, year, university, bio, phone, location, portfolio_link, created_at FROM student_profiles WHERE user_id = $1', [userId]);

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
      'SELECT id, full_name, program, year, bio, university, portfolio_link FROM student_profiles WHERE id = $1',
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

    const profile = await pool.query(
      'SELECT id, company_name, industry, niche, description, website, contact_email, location, created_at FROM organisation_profiles WHERE user_id = $1',
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json(profile.rows[0]);

  } catch (err) {
    console.error('Error getting org profile', err);
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

    const { full_name, program, year, university, bio, phone, location, portfolio_link } = req.body;

    const result = await pool.query(
      'UPDATE student_profiles SET full_name = $1, program = $2, year = $3, university = $4, bio = $5, phone = $6, location = $7, portfolio_link = $8 WHERE user_id = $9 RETURNING *',
      [full_name, program, year, university, bio, phone, location, portfolio_link, userId]
    )

    if(result.rows.length === 0){
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.status(200).json({ 
      message: 'Profile updated successfully', 
      profile: result.rows[0] 
    });

  } catch (error) {
    console.error('Error updating student profile', error);
    res.status(500).json({ error: 'Server error' });
  }

}

const updateOrgProfile = async (req, res) => {
  res.json({ message: 'Coming soon' });

}





module.exports = {
  getStudentProfile,
  getOrgProfile,
  updateStudentProfile,
  updateOrgProfile,
  getStudentProfilePublic,
  getOrgProfilePublic
};