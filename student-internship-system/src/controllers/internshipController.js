const pool = require('../config/db');

// Create internship
const createInternship = async (req, res) => {
  const { title, description, requirements, location, duration, stipend, other_info } = req.body;
  const userId = req.user.userId;
  
  try {
    // Get organization profile ID
    const orgProfile = await pool.query(
      'SELECT id, user_id FROM organization_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (orgProfile.rows.length === 0) {
      return res.status(404).json({ error: 'Organization profile not found' });
    }
    
    // Check if organization is approved
    const user = await pool.query('SELECT approved FROM users WHERE id = $1', [userId]);
    
    if (!user.rows[0].approved) {
      return res.status(403).json({ error: 'Your account must be approved before posting internships' });
    }
    
    const organizationId = orgProfile.rows[0].id;
    
    // Create internship
    const newInternship = await pool.query(
      `INSERT INTO internships 
       (organization_id, title, description, requirements, location, duration, stipend, other_info) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [organizationId, title, description, requirements || null, location, duration || null, stipend || null, other_info || null]
    );
    
    res.status(201).json({
      message: 'Internship posted successfully!',
      internship: newInternship.rows[0]
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all active internships
const getAllInternships = async (req, res) => {
  try {
    const internships = await pool.query(
      `SELECT i.*, o.company_name, o.industry, o.location as company_location
       FROM internships i
       JOIN organization_profiles o ON i.organization_id = o.id
       WHERE i.is_active = true
       ORDER BY i.created_at DESC`
    );
    
    res.status(200).json({ internships: internships.rows });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createInternship,
  getAllInternships
};