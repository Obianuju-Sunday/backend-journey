const { body } = require('express-validator');

const studentRegisterValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password must contain uppercase, lowercase, number, and symbol (min 8 chars)'),
  body('full_name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be 2-50 characters'),
  body('program')
    .trim()
    .escape()
    .isLength({ min: 2, max: 60 })
    .withMessage('Program must be 2-60 characters'),
  body('year')
    .isInt({ min: 1, max: 6 })
    .withMessage('Year must be between 1-6'),
  body('phone')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage('Phone must not exceed 20 characters'),
  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Location must not exceed 50 characters'),
  body('bio')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 300 })
    .withMessage('Bio must not exceed 300 characters'),
  body('university')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage('University must not exceed 100 characters'),
  body('portfolio_link')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Portfolio link must not exceed 200 characters'),
];

const orgRegisterValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage('Password must contain uppercase, lowercase, number, and symbol (min 8 chars)'),
  body('company_name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be 2-100 characters'),
  body('industry')
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be 2-50 characters'),
  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Location must not exceed 50 characters'),
  body('website')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Website must not exceed 200 characters'),
  body('niche')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Niche must not exceed 50 characters'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
];

const loginValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const updateStudentProfileValidator = [
  body('full_name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be 2-50 characters'),
  body('bio')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 300 })
    .withMessage('Bio must not exceed 300 characters'),
  body('phone')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 20 })
    .withMessage('Phone must not exceed 20 characters'),
  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Location must not exceed 50 characters'),
  body('portfolio_link')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Portfolio link must not exceed 200 characters'),
  body('program')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 60 })
    .withMessage('Program must be 2-60 characters'),
  body('year')
    .optional()
    .isInt({ min: 1, max: 6 })
    .withMessage('Year must be between 1-6'),
  body('university')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage('University must not exceed 100 characters'),
];

const updateOrgProfileValidator = [
  body('company_name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be 2-100 characters'),
  body('industry')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be 2-50 characters'),
  body('website')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Website must not exceed 200 characters'),
  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Location must not exceed 50 characters'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  body('niche')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Niche must not exceed 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid contact email format')
    .normalizeEmail(),
];

const createInternshipValidator = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be 5-100 characters'),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be 10-1000 characters'),
  body('requirements')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Requirements must not exceed 500 characters'),
  body('location')
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage('Location must be 2-50 characters'),
  body('duration')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Duration must not exceed 50 characters'),
  body('stipend')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 50 })
    .withMessage('Stipend must not exceed 50 characters'),
];

module.exports = {
  studentRegisterValidator,
  orgRegisterValidator,
  loginValidator,
  updateStudentProfileValidator,
  updateOrgProfileValidator,
  createInternshipValidator,
};