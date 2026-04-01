import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import corsConfig from './middleware/corsConfig.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import config from './config/config.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import apiRoutes from './routes/api.js';
import userRoutes from './routes/users.js';
import { startNgrok, stopNgrok } from './ngrok/index.js';
import { authenticateToken } from './middleware/authMiddleware.js';

// Calculate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

/**
 * ═══════════════════════════════════════════════════════════
 * MIDDLEWARE SETUP
 * ═══════════════════════════════════════════════════════════
 */

// Logger - logs all HTTP requests
app.use(logger);

// CORS - allow requests from frontend
app.use(corsConfig);

// Body Parser - parse JSON request bodies (built into Express)
app.use(express.json());

// URL Encoded - parse form data
app.use(express.urlencoded({ extended: true }));

// use authentication middleware for protected routes

app.use('/api/users', authenticateToken);

/**
 * ═══════════════════════════════════════════════════════════
 * ROUTES
 * ═══════════════════════════════════════════════════════════
 */

app.use(config.apiPrefix, apiRoutes);

// Users API routes
app.use(`${config.apiPrefix}/users`, userRoutes);
app.use(`/api/auth`, userRoutes); // For auth routes like register/login
app.use(`/api/users`, userRoutes); // For user-related routes like get/update user


/**
 * ═══════════════════════════════════════════════════════════
 * STATIC FILES & SPA ROUTING
 * ═══════════════════════════════════════════════════════════
 */

// Serve static files from public folder (built Vue app)
app.use(express.static(path.join(__dirname, '../Public')));

// SPA fallback - serve index.html for all non-API routes
// This allows Vue Router to handle all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/'));
});

// 404 Handler - catch undefined routes (API only, since SPA routes are handled above)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Oops! The page you are looking for does not exist.😒',
    path: req.originalUrl,
  });
});

/**
 * ═══════════════════════════════════════════════════════════
 * ERROR HANDLING
 * ═══════════════════════════════════════════════════════════
 */

// Global error handler (must be last)
app.use(errorHandler);

/**
 * ═══════════════════════════════════════════════════════════
 * START SERVER
 * ═══════════════════════════════════════════════════════════
 */

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDatabase();

    const server = app.listen(config.port, async () => {
      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║         🚀 SOLO LEVELING SERVER STARTED                   ║');
      console.log(`║  Port: ${String(config.port).padEnd(49)}║`);
      console.log(`║  Environment: ${String(config.nodeEnv).padEnd(43)}║`);
      console.log(`║  Frontend URL: ${String(config.frontendUrl).padEnd(41)}║`);
      console.log('║                                                            ║');
      console.log(`║  API Endpoints: http://localhost:${config.port}${config.apiPrefix}${''.padEnd(15)}║`);
      console.log('║                                                            ║');

      // Start ngrok if enabled
      if (config.useNgrok && config.ngrokAuthToken) {
        try {
          const publicUrl = await startNgrok(config.port);
          console.log(`║  🌐 Public URL: ${String(publicUrl).padEnd(44)}║`);
        } catch (err) {
          console.error('⚠️  ngrok initialization failed:', err.message);
        }
      }

      console.log('║  Press CTRL+C to stop the server                          ║');
      console.log('╚════════════════════════════════════════════════════════════╝\n');
    });

    // Graceful shutdown on Ctrl+C
    process.on('SIGINT', async () => {
      console.log('\n\n📛 Shutting down server gracefully...');
      server.close(async () => {
        await stopNgrok();
        await disconnectDatabase();
        console.log('✅ Server stopped');
        process.exit(0);
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('❌ Uncaught Exception:', err);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

// Start the server
startServer();


