const pool = require("../config/db");

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const targetStudentId = req.params.id;

    // PUBLIC ROUTE - No token from a visitor who isn't logged in
    if (!req.user) {
      const profile = await pool.query(
        'SELECT id, full_name, program, university, portfolio_link FROM student_profiles WHERE id = $1',
        [targetStudentId]
      );

      if (profile.rows.length === 0) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      return res.status(200).json(profile.rows[0]);
    }

    // AUTHENTICATED USER
    const requesterRole = req.user.role;
    const isOwnProfile = targetStudentId === req.user.studentId;

    let query;

    if (isOwnProfile || requesterRole === 'organisation') {
      query = 'SELECT * FROM student_profiles WHERE id = $1';
    } else if (requesterRole === 'student') {
      query = 'SELECT id, full_name, program, university, portfolio_link FROM student_profiles WHERE id = $1';
    }

    const profile = await pool.query(query, [targetStudentId]);

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