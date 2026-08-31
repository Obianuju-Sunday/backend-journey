
// server.js - Main entry point for the Student Internship System backend
// This file sets up the Express server, connects to the database, and defines routes.
require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');
const app = express();
const path = require('path');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));

// EJS routes:
app.get('/', (req, res) => res.render('home', { user: req.user }));
app.get('/auth/login', (req, res) => res.render('auth/login', { user: null }));
app.get('/auth/register/student', (req, res) => res.render('auth/registerStudent', { user: null }));
app.get('/auth/register/org', (req, res) => res.render('auth/registerOrganisation', { user: null }));
app.get('/student/browse', (req, res) => res.render('student/browseInternships', { user: req.user }));
app.get('/org/dashboard', (req, res) => res.render('org/orgDashboard', { user: req.user }));
app.get('/student/my-applications', (req, res) => res.render('student/myApplications', { user: req.user }));

// API routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

const internshipRoutes = require('./src/routes/internshipRoutes');
app.use('/api/internship', internshipRoutes);

const applicationRoutes = require('./src/routes/applicationRoutes');
app.use('/api/application', applicationRoutes);

const skillRoutes = require('./src/routes/skillRoutes');
app.use('/api/skills', skillRoutes); 

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.render('home'); 
}); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});