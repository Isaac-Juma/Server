// Centralized configuration for the entire application
// This makes it easy to manage settings in one place

export const config = {
  // Server
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // API
  apiPrefix: process.env.API_PREFIX || '/api',
  logLevel: process.env.LOG_LEVEL || 'info',

  // JWT Secret for token generation and verification
  jwtSecret: process.env.JWT_SECRET, // Must be set in .env for production


  // ngrok - for exposing local server to the internet
  useNgrok: process.env.USE_NGROK === 'true',
  ngrokAuthToken: process.env.NGROK_AUTHTOKEN || null,

  // Validation
  isValidPort: (port) => {
    return Number.isInteger(port) && port > 0 && port < 65536;
  },
};

// Validate configuration
if (!config.isValidPort(config.port)) {
  throw new Error(`Invalid PORT: ${config.port}. Must be between 1 and 65535`);
}

export default config;
