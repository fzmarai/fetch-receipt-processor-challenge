import express, { Express, Request, Response } from 'express';
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

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Receipt Processor API'});
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok'});
});

// Start server
const startServer = () => {
    app.listen(config.port, () => {
        logger.info('Server running on port ${config.port}');
    });
};

export { app, startServer };