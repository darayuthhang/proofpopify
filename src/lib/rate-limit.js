import { RateLimiter } from "limiter";

// Registration: 5 requests per minute
export const registerLimiter = new RateLimiter({
  tokensPerInterval: 200,
  interval: "minute",
  fireImmediately: true,
});

// Login: 10 attempts per minute
export const loginLimiter = new RateLimiter({
  tokensPerInterval: 200,
  interval: "minute",
  fireImmediately: true,
});

// Forgot Password: 3 requests per minute
export const forgotPasswordLimiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: "minute",
  fireImmediately: true,
});

// Verify Email: 10 requests per minute
export const verifyEmailLimiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: "minute",
  fireImmediately: true,
});

// Reset Password: 5 requests per minute
export const resetPasswordLimiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: "minute",
  fireImmediately: true,
});
