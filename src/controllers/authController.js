const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register Student
const registerStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, full_name, program, year, university, bio, phone, location, portfolio_link } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Invalid Credentials.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await pool.query(
      'INSERT INTO users (email, password, role, approved) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, 'student', true]
    );

    const userId = newUser.rows[0].id;

    // Insert student profile
    await pool.query(
      'INSERT INTO student_profiles (user_id, full_name, program, year, university, bio, phone, location, portfolio_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [userId, full_name, program, year, university || null, bio || null, phone || null, location || null, portfolio_link || null]
    );

    res.status(201).json({
      message: 'Student registered successfully',
      user: {
        id: userId,
        email,
        role: 'student',
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register Organisation
const registerOrganisation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, company_name, industry, niche, description, website, contact_email, location } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Invalid Credentials.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user (approved = false for orgs)
    const newUser = await pool.query(
      'INSERT INTO users (email, password, role, approved) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, 'organisation', false]
    );

    const userId = newUser.rows[0].id;

    // Insert org profile
    await pool.query(
      'INSERT INTO organisation_profiles (user_id, company_name, industry, niche, description, website, contact_email, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, company_name, industry, niche || null, description || null, website || null, contact_email || null, location || null]
    );

    res.status(201).json({ message: 'Organisation registered. Awaiting admin approval.',
      user: {
        id: userId,
        email,
        role: 'organisation',
      }
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userQuery.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get profile data based on role 
    let profileData = {};
    
    if (user.role === 'student') {
      const studentProfile = await pool.query(
        'SELECT full_name FROM student_profiles WHERE user_id = $1',
        [user.id]
      );
      profileData.full_name = studentProfile.rows[0]?.full_name || 'Student';
    } else if (user.role === 'organisation') {
      const orgProfile = await pool.query(
        'SELECT company_name FROM organisation_profiles WHERE user_id = $1',
        [user.id]
      );
      profileData.company_name = orgProfile.rows[0]?.company_name || 'Organization';
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        approved: user.approved,
        full_name: profileData.full_name,
        company_name: profileData.company_name
      }
    });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout
const logout = async (req, res) => {

}

// Get current user
const getCurrentUser = async (req, res) => {

}

module.exports = {
  registerStudent,
  registerOrganisation,
  login,
  logout,
  getCurrentUser
};