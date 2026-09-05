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
  try {
    const userId = req.user.userId;

    const applications = await pool.query(
      `SELECT 
          a.id,
          a.status,
          a.internship_id,
          i.title as internship_title,
          i.location,
          o.company_name
       FROM applications a
       JOIN internships i ON a.internship_id = i.id
       JOIN organisation_profiles o ON i.organisation_id = o.id
       WHERE a.student_id = (SELECT id FROM student_profiles WHERE user_id = $1)
       ORDER BY a.id DESC`,
      [userId]
    );

    res.json({
      applications: applications.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Get applications for organisation's internships
const getOrgApplications = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Get org profile ID
    const orgProfile = await pool.query(
      'SELECT id FROM organisation_profiles WHERE user_id = $1',
      [userId]
    );

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({ error: 'organisation profile not found' });
    }

    const orgId = orgProfile.rows[0].id;

    // Get all applications for this org's internships
    const applications = await pool.query(
      `SELECT a.*, i.title as internship_title,
          s.full_name, s.program, s.university, s.phone, s.portfolio_link,
          u.email as student_email
   FROM applications a
   JOIN internships i ON a.internship_id = i.id
   JOIN student_profiles s ON a.student_id = s.id
   JOIN users u ON s.user_id = u.id
   WHERE i.organisation_id = $1
   ORDER BY a.applied_at DESC`,
      [orgId]
    );

    res.status(200).json({ applications: applications.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { application_id, status } = req.body;
  const userId = req.user.userId;

  try {
    // Verify this application belongs to org's internship
    const orgProfile = await pool.query(
      'SELECT id FROM organisation_profiles WHERE user_id = $1',
      [userId]
    );

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({ error: 'organisation profile not found' });
    }

    const orgId = orgProfile.rows[0].id;

    // Update status
    const updated = await pool.query(
      `UPDATE applications a
       SET status = $1
       FROM internships i
       WHERE a.id = $2 AND a.internship_id = i.id AND i.organisation_id = $3
       RETURNING a.*`,
      [status, application_id, orgId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Application status updated',
      application: updated.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get full details of a specific application (for org)
const getApplicationDetails = async (req, res) => {
  const applicationId = req.params.id;
  const userId = req.user.userId;

  try {
    // Get organisation profile
    const orgProfile = await pool.query(
      'SELECT id FROM organisation_profiles WHERE user_id = $1',
      [userId]
    );

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({
        error: 'Organisation profile not found'
      });
    }

    const orgId = orgProfile.rows[0].id;

    // Get application and student details
    const application = await pool.query(
      `SELECT 
          a.id,
          a.cover_letter,
          a.status,
          a.applied_at,
          i.id AS internship_id,
          i.title AS internship_title,
          s.id AS student_id,
          s.full_name,
          s.program,
          s.year,
          s.university,
          s.bio,
          s.phone,
          s.location,
          s.portfolio_link,
          u.email AS student_email
       FROM applications a
       JOIN internships i ON a.internship_id = i.id
       JOIN student_profiles s ON a.student_id = s.id
       JOIN users u ON s.user_id = u.id
       WHERE a.id = $1
       AND i.organisation_id = $2`,
      [applicationId, orgId]
    );

    if (application.rows.length === 0) {
      return res.status(404).json({
        error: 'Application not found'
      });
    }

    const applicationData = application.rows[0];

    // Get student's skills
    const skills = await pool.query(
      `SELECT 
          s.id,
          s.skill_name,
          ss.proficiency
       FROM student_skills ss
       JOIN skills s ON ss.skill_id = s.id
       WHERE ss.student_id = $1
       ORDER BY s.skill_name`,
      [applicationData.student_id]
    );

    res.status(200).json({
      application: {
        id: applicationData.id,
        cover_letter: applicationData.cover_letter,
        status: applicationData.status,
        applied_at: applicationData.applied_at,
        internship_id: applicationData.internship_id,
        internship_title: applicationData.internship_title,

        student: {
          id: applicationData.student_id,
          full_name: applicationData.full_name,
          email: applicationData.student_email,
          program: applicationData.program,
          year: applicationData.year,
          university: applicationData.university,
          bio: applicationData.bio,
          phone: applicationData.phone,
          location: applicationData.location,
          portfolio_link: applicationData.portfolio_link,
          skills: skills.rows
        }
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// Delete an application (for student)
const deleteApplication = async (req, res) => {

}

module.exports = {
  applyToInternship,
  getMyApplications,
  getOrgApplications,
  updateApplicationStatus,
  getApplicationDetails,
  deleteApplication
};