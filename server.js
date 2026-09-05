// server.js
const express = require('express');
const path = require('path');
const app = express();

// ========== SETUP EJS ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('public'));

// ========== MIDDLEWARE ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== IMPORT ROUTES ==========
const pagesRouter = require('./src/routes/pages');
const authRoutes = require('./src/routes/authRoutes');
const internshipRoutes = require('./src/routes/internshipRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const skillRoutes = require('./src/routes/skillRoutes');
const userRoutes = require('./src/routes/userRoutes');

// ========== USE ROUTES ==========
// Pages first (renders EJS)
app.use('/', pagesRouter);

// API routes second (handles data)
app.use('/api/auth', authRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', userRoutes);

// ========== START SERVER ==========
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {});
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {});
});