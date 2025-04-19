import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import logger from './config/logger';

// Create Express app
const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Receipt Processor API'});
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok'});
});

// 404 handler
app.use((req:Request, res:Response) => {
    logger.warn(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response) => {
    logger.error(`Unhanddled error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const startServer = () => {
    try {
        const server = app.listen(config.port, () => {
          logger.info(`Server running on port ${config.port}`);
        });
    
        // Handle graceful shutdown
        process.on('SIGTERM', () => {
          logger.info('SIGTERM signal received, closing HTTP server');
          server.close(() => {
            logger.info('HTTP server closed');
            process.exit(0);
          });
        });
      } catch (error) {
        logger.error(`Failed to start server: ${error}`);
        process.exit(1);
      }
};

export { app, startServer };