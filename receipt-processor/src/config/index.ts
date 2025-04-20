import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Application configuration
const config = {
    // Server configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // API configuration
    apiPrefix: '/api',

    // Logging configuration
    logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;