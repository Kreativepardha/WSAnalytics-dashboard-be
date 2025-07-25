import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests/minute
  message: 'Too many requests, please try again later.',
});
