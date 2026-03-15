const pool = require('../config/db');

// Apply to internship
const applyToInternship = async (req, res) => {
  const { internship_id, cover_letter } = req.body;
  const userId = req.user.userId;
  
  try {
    // Get student profile ID
    const studentProfile = await pool.query(
      'SELECT id FROM student_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (studentProfile.rows.length === 0) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    
    const studentId = studentProfile.rows[0].id;
    
    // Check if already applied
    const existingApp = await pool.query(
      'SELECT * FROM applications WHERE student_id = $1 AND internship_id = $2',
      [studentId, internship_id]
    );
    
    if (existingApp.rows.length > 0) {
      return res.status(400).json({ error: 'You have already applied to this internship' });
    }
    
    // Create application
    const newApp = await pool.query(
      'INSERT INTO applications (student_id, internship_id, cover_letter, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [studentId, internship_id, cover_letter || null, 'pending']
    );
    
    res.status(201).json({
      message: 'Application submitted successfully!',
      application: newApp.rows[0]
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get student's applications
const getMyApplications = async (req, res) => {
  const userId = req.user.userId;
  
  try {
    const studentProfile = await pool.query(
      'SELECT id FROM student_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (studentProfile.rows.length === 0) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    
    const studentId = studentProfile.rows[0].id;
    
    const applications = await pool.query(
      `SELECT a.*, i.title, i.location, i.duration, i.stipend, 
              o.company_name, o.industry
       FROM applications a
       JOIN internships i ON a.internship_id = i.id
       JOIN organization_profiles o ON i.organization_id = o.id
       WHERE a.student_id = $1
       ORDER BY a.applied_at DESC`,
      [studentId]
    );
    
    res.status(200).json({ applications: applications.rows });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  applyToInternship,
  getMyApplications
};