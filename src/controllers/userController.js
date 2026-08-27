const pool = require("../config/db");

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.userId


    const profile = await pool.query('SELECT id, full_name, program, year, university, bio, phone, location, portfolio_link, created_at FROM student_profiles WHERE user_id = $1', [userId]);

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile.rows[0]);

  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get organization profile
const getOrgProfile = async (req, res) => {
  try {
    const targetOrgId = req.user.id;

    const profile = await pool.query(
      'SELECT * FROM organization_profiles WHERE id = $1',
      [targetOrgId]
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

const getStudentProfilePublic = async (req, res) => {
  // uses req.params
  res.json({ message: 'Coming soon' })



  // PUBLIC ROUTE - No token from a visitor who isn't logged in
  // if (!req.user) {
  //   const profile = await pool.query(
  //     'SELECT id, full_name, program, university, portfolio_link FROM student_profiles WHERE id = $1',
  //     [targetStudentId]
  //   );
}

const getOrgProfilePublic = async (req, res) => {
  // Also uses req.params
  res.json({ message: 'Coming soon' })
}

module.exports = {
  getStudentProfile,
  getOrgProfile,
  updateStudentProfile,
  updateOrgProfile,
  getStudentProfilePublic,
  getOrgProfilePublic
};