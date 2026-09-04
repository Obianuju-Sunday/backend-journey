// pages.js
const express = require('express');
const router = express.Router();

// ========== HELPER FUNCTION ==========
// This just renders pages without requiring backend authentication
// The frontend (browser) will handle authentication with JWT tokens

function renderPage(res, page, data = {}) {
  res.render(page, data);
}

// ========== PUBLIC PAGES (Anyone can see) ==========

// ========== PUBLIC PAGES ==========
router.get('/', (req, res) => {
  renderPage(res, 'home', { user: null });
});

router.get('/auth/login', (req, res) => {
  renderPage(res, 'auth/login', { user: null });
});

router.get('/auth/register-student', (req, res) => {
  renderPage(res, 'auth/register-student', { user: null });
});

router.get('/auth/register-organisation', (req, res) => {
  renderPage(res, 'auth/register-organisation', { user: null });
});

// ========== STUDENT PAGES ==========
router.get('/student/browse-internship', (req, res) => {
  renderPage(res, 'student/browseInternships', { user: null });
});

router.get('/student/skill-profile', (req, res) => {
  renderPage(res, 'student/skillProfile', { user: null }); 
});

router.get('/student/student-profile', (req, res) => {
  renderPage(res, 'student/student-profile', { user: null });
});

router.get('/student/my-applications', (req, res) => {
  renderPage(res, 'student/myApplications', { user: null });
});

// ========== ORG PAGES ==========
router.get('/org/dashboard', (req, res) => {
  renderPage(res, 'org/orgDashboard', { user: null });
});

router.get('/org/profile', (req, res) => {
  renderPage(res, 'org/profile', { user: null });
});

router.get('/org/internship-applications', (req, res) => {
  renderPage(res, 'org/internshipApplications', { 
    user: null,
  });
});

// ========== ERROR PAGE ==========
router.get('/error', (req, res) => {
  renderPage(res, 'error', { user: null });
});

module.exports = router;