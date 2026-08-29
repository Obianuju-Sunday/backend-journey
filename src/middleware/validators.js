const { body } = require('express-validator');

const studentRegisterValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('full_name').trim().notEmpty(),
  body('program').trim().notEmpty(),
  body('year').isInt({ min: 1, max: 6 }),
];

const orgRegisterValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('company_name').trim().notEmpty(),
  body('industry').trim().notEmpty(),
];

const loginValidator = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

const updateStudentProfileValidator = [
  body('full_name').optional().trim().notEmpty(),
  body('bio').optional().trim(),
  body('phone').optional().trim().isMobilePhone(),
  body('location').optional().trim(),
  body('portfolio_link').optional().trim().isURL(),
];

const updateOrgProfileValidator = [
  body('company_name').optional().trim().notEmpty(),
  body('industry').optional().trim(),
  body('website').optional().trim().isURL(),
  body('location').optional().trim(),
  body('description').optional().trim(),
];

module.exports = {
  studentRegisterValidator,
  orgRegisterValidator,
  loginValidator,
  updateStudentProfileValidator,
  updateOrgProfileValidator
};