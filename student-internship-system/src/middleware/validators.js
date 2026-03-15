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

module.exports = {
  studentRegisterValidator,
  orgRegisterValidator,
  loginValidator
};