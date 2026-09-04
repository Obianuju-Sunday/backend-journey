const pool = require('../config/db');

// Create internship
const createInternship = async (req, res) => {
  const { title, description, requirements, location, duration, stipend, other_info } = req.body;
  const userId = req.user.userId;

  try {
    // Get organisation profile ID
    const orgProfile = await pool.query(
      'SELECT id, user_id FROM organisation_profiles WHERE user_id = $1',
      [userId]
    );

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({ error: 'organisation profile not found' });
    }

    // Check if organisation is approved
    const user = await pool.query('SELECT approved FROM users WHERE id = $1', [userId]);

    if (!user.rows[0].approved) {
      return res.status(403).json({ error: 'Your account must be approved before posting internships' });
    }

    const organisationId = orgProfile.rows[0].id;

    // Create internship
    const newInternship = await pool.query(
      `INSERT INTO internships 
       (organisation_id, title, description, requirements, location, duration, stipend, other_info) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [organisationId, title, description, requirements || null, location, duration || null, stipend || null, other_info || null]
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
       JOIN organisation_profiles o ON i.organisation_id = o.id
       WHERE i.is_active = true
       ORDER BY i.created_at DESC`
    );

    res.status(200).json({ internships: internships.rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getOrgInternships = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orgProfile = await pool.query(`SELECT id FROM organisation_profiles WHERE user_id = $1`, [userId])
    // Step 1: Find organisation profile for this user
    // Query: WHERE user_id = userId

    if (orgProfile.rows.length === 0) {
      return res.status(404).json({
        error: "organisation profile not found"
      })
    }

    const orgId = orgProfile.rows[0].id;
    // Step 2: Check if org profile exists
    // If not, return 404


    // const orgsInternships = await pool.query(`SELECT id FROM internships WHERE organisation_id = $1`, [orgId])

    const internships = await pool.query(
      `SELECT 
          i.*,
          COUNT(a.id)::int AS application_count
       FROM internships i
       LEFT JOIN applications a
         ON a.internship_id = i.id
       WHERE i.organisation_id = $1
       GROUP BY i.id
       ORDER BY i.created_at DESC`,
      [orgId]
    );

    // Step 3: Get all internships for this org
    // Query: WHERE organisation_id = orgProfileId

    const applications = await pool.query(
      `SELECT a.*, i.title as internship_title, s.full_name, s.program, u.email as student_email, s.portfolio_link
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        JOIN student_profiles s ON a.student_id = s.id
        JOIN users u ON s.user_id = u.id
        WHERE i.organisation_id = $1`,
      [orgId]
    )

    // Step 4: For EACH internship, count applicants
    // Use .filter() and .length
    const internshipsWithCounts = internships.rows.map(internship => {
      const applicationCount = applications.rows.filter(
        application => application.internship_id === internship.id
      ).length;

      return {
        ...internship,
        applicationCount
      };
    });


    res.json({
      internships: internships.rows,
      applications: applications.rows
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

// Get internship by ID
const getInternshipById = async (req, res) => {

}

// Update internship
const updateInternship = async (req, res) => {

}

// Delete internship
// const deleteInternship = async (req, res) => {
//   const internshipId = req.params.id;
//   const userId = req.user.userId;

//   try {
//     // Get organisation profile ID
//     const orgProfile = await pool.query(
//       'SELECT id FROM organisation_profiles WHERE user_id = $1',
//       [userId]
//     );

//     if (orgProfile.rows.length === 0) {
//       return res.status(404).json({ error: 'organisation profile not found' });
//     }

//     const organisationId = orgProfile.rows[0].id;

//     // Check if the internship belongs to the organisation
//     const internship = await pool.query(
//       'SELECT * FROM internships WHERE id = $1 AND organisation_id = $2',
//       [internshipId, organisationId]
//     );

//     if (internship.rows.length === 0) {
//       return res.status(404).json({ error: 'Internship not found or does not belong to your organisation' });
//     }

//     // Delete the internship
//     await pool.query('DELETE FROM internships WHERE id = $1', [internshipId]);

//     res.status(200).json({ message: 'Internship deleted successfully' });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const getInternshipApplicationCount = async (req, res) => {
// Built into getOrgInternships function above
// }

module.exports = {
  createInternship,
  getAllInternships,
  getOrgInternships,
  getInternshipById,
  updateInternship,
  // deleteInternship
  // getInternshipApplicationCount
};