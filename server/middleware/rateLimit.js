import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for form submissions
 * Limits each IP to 5 requests per 15-minute window
 */
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    error: 'Too many requests from this IP. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default formLimiter;
