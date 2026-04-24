import { body, validationResult } from 'express-validator';

/**
 * Validation rules for contact form
 */
export const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any').withMessage('Please provide a valid phone number'),
  body('goal')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Lose Weight', 'Build Muscle', 'General Fitness', 'Injury Recovery', 'Other'])
    .withMessage('Invalid goal selection'),
  body('experience')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced'])
    .withMessage('Invalid experience level'),
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Message must be under 1000 characters')
    .escape(),
  body('preferredTime')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Morning', 'Afternoon', 'Evening'])
    .withMessage('Invalid time preference'),
];

/**
 * Validation rules for booking form
 */
export const bookingValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any').withMessage('Please provide a valid phone number'),
  body('service')
    .trim()
    .notEmpty().withMessage('Service selection is required'),
  body('date')
    .optional({ checkFalsy: true })
    .trim()
    .isISO8601().withMessage('Please provide a valid date'),
  body('time')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['Morning', 'Afternoon', 'Evening'])
    .withMessage('Invalid time selection'),
  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Message must be under 1000 characters')
    .escape(),
];

/**
 * Middleware to handle validation results
 */
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
