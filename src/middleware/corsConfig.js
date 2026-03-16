import cors from 'cors';

/**
 * Configure CORS to allow requests from your frontend
 * When using ngrok, you'll need to update FRONTEND_URL or add the ngrok URL
 */
const corsConfig = cors({
  origin: (origin, callback) => {
    // Allowed origins for development and production
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:5173', // Default dev server
      'http://localhost:3000',  // Alternative dev server
    ];

    // In development, allow any origin from ngrok
    if (process.env.NODE_ENV === 'development' && process.env.USE_NGROK === 'true') {
      // Allow ngrok URLs (they start with https)
      if (!origin || origin.includes('.ngrok') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
});

export default corsConfig;
