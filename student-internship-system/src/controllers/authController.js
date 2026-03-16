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

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Register Organization
const registerOrganization = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, company_name, industry, niche, description, website, contact_email, location } = req.body;

  try {
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user (approved = false for orgs)
    const newUser = await pool.query(
      'INSERT INTO users (email, password, role, approved) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, 'organization', false]
    );

    const userId = newUser.rows[0].id;

    // Insert org profile
    await pool.query(
      'INSERT INTO organization_profiles (user_id, company_name, industry, niche, description, website, contact_email, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, company_name, industry, niche || null, description || null, website || null, contact_email || null, location || null]
    );

    res.status(201).json({ message: 'Organization registered. Awaiting admin approval.' });
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

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
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
        approved: user.approved
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

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

module.exports = {
  registerStudent,
  registerOrganization,
  login,
  getStudentProfile,
  getOrgProfile
};