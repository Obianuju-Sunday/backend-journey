const { body } = require('express-validator');

const studentRegisterValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 6, max: 50 }),
  body('full_name').trim().notEmpty().escape().isLength({ min: 2, max: 50 }),
  body('program').trim().notEmpty().escape().isLength({ min: 2, max: 60 }),
  body('year').isInt({ min: 1, max: 6 }),
  body('phone').optional().trim().escape().isLength({ max: 20 }),
  body('location').optional().trim().escape().isLength({ max: 50 }),
  body('bio').optional().trim().escape().isLength({ max: 300 }),
  body('university').optional().trim().escape().isLength({ max: 100 }),
  body('portfolio_link').optional().trim().isLength({ max: 200 }),
];

const orgRegisterValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 6, max: 50 }),
  body('company_name').trim().notEmpty().escape().isLength({ min: 2, max: 100 }),
  body('industry').trim().notEmpty().escape().isLength({ min: 2, max: 50 }),
  body('location').optional().trim().escape().isLength({ max: 50 }),
  body('website').optional().trim().isLength({ max: 200 }),
  body('niche').optional().trim().escape().isLength({ max: 50 }),
  body('description').optional().trim().escape().isLength({ max: 500 }),
  body('contact_email').optional().trim().isEmail().normalizeEmail(),
];

const loginValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 6, max: 50 }),
];

const updateStudentProfileValidator = [
  body('full_name').optional().trim().notEmpty().escape().isLength({ min: 2, max: 50 }),
  body('bio').optional().trim().escape().isLength({ max: 300 }),
  body('phone').optional().trim().escape().isLength({ max: 20 }),
  body('location').optional().trim().escape().isLength({ max: 50 }),
  body('portfolio_link').optional().trim().isLength({ max: 200 }),
  body('program').optional().trim().notEmpty().escape().isLength({ min: 2, max: 60 }),
  body('year').optional().isInt({ min: 1, max: 6 }),
  body('university').optional().trim().escape().isLength({ max: 100 }),
];

const updateOrgProfileValidator = [
  body('company_name').optional().trim().notEmpty().escape().isLength({ min: 2, max: 100 }),
  body('industry').optional().trim().escape().isLength({ min: 2, max: 50 }),
  body('website').optional().trim().isLength({ max: 200 }),
  body('location').optional().trim().escape().isLength({ max: 50 }),
  body('description').optional().trim().escape().isLength({ max: 500 }),
  body('niche').optional().trim().escape().isLength({ max: 50 }),
  body('contact_email').optional().trim().isEmail().normalizeEmail(),
];

const createInternshipValidator = [
  body('title').trim().notEmpty().escape().isLength({ min: 5, max: 100 }),
  body('description').trim().notEmpty().escape().isLength({ min: 10, max: 1000 }),
  body('requirements').optional().trim().escape().isLength({ max: 500 }),
  body('location').trim().notEmpty().escape().isLength({ min: 2, max: 50 }),
  body('duration').optional().trim().escape().isLength({ max: 50 }),
  body('stipend').optional().trim().escape().isLength({ max: 50 }),
];

module.exports = {
  studentRegisterValidator,
  orgRegisterValidator,
  loginValidator,
  updateStudentProfileValidator,
  updateOrgProfileValidator,
  createInternshipValidator,
};