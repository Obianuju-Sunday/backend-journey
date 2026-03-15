
// server.js - Main entry point for the Student Internship System backend
// This file sets up the Express server, connects to the database, and defines routes.
require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

const dashboardRoutes = require('./src/routes/dashboardRoutes');
app.use('/', dashboardRoutes);

const internshipRoutes = require('./src/routes/internshipRoutes');
app.use('/internship', internshipRoutes);

const applicationRoutes = require('./src/routes/applicationRoutes');
app.use('/application', applicationRoutes);
 
// Basic route to check if server is running
app.get('/', (req, res) => {
  // res.send('Internship System - Ready!');
  res.render('home'); 
}); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});