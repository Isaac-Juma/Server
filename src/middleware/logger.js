import morgan from 'morgan';

// Custom Morgan format for better readability
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

const logger = morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging health checks to reduce noise
    return req.url === '/api/health';
  },
});

export default logger;
