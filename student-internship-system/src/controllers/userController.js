const pool = require("../config/db");

// Get student profile
const getStudentProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get organization profile
const getOrgProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const profile = await pool.query(
      'SELECT * FROM organization_profiles WHERE user_id = $1',
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateStudentProfile = async (req, res) => {
    res.json({ message: 'Coming soon' });

}

const updateOrgProfile = async (req, res) => {
    res.json({ message: 'Coming soon' });

}

module.exports = {
  getStudentProfile,
  getOrgProfile,
  updateStudentProfile,
  updateOrgProfile
};