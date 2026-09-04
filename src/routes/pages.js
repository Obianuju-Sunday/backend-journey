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

    internshipTitle: 'Backend Developer Intern',

    applications: [

      {
        id: 1,
        student_id: 2,
        full_name: 'John Doe',
        student_email: 'john@example.com',
        program: 'Computer Science',
        status: 'pending'
      },

      {
        id: 2,
        student_id: 3,
        full_name: 'Mary Jane',
        student_email: 'mary@example.com',
        program: 'Software Engineering',
        status: 'accepted'
      },

      {
        id: 3,
        student_id: 4,
        full_name: 'David James',
        student_email: 'david@example.com',
        program: 'Information Technology',
        status: 'rejected'
      }

    ]
  });
});

// ========== ERROR PAGE ==========
router.get('/error', (req, res) => {
  renderPage(res, 'error', { user: null });
});

module.exports = router;