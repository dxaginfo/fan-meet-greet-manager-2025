import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { configureRoutes } from './routes';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

// Configure middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fan Meet & Greet Manager API',
      version: '1.0.0',
      description: 'API documentation for Fan Meet & Greet Manager',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Configure routes
configureRoutes(app);

// Error handling middleware
app.use(errorHandler);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  // Join a room (event)
  socket.on('join-event', (eventId) => {
    socket.join(`event-${eventId}`);
    logger.info(`Socket ${socket.id} joined event ${eventId}`);
  });

  // Leave a room (event)
  socket.on('leave-event', (eventId) => {
    socket.leave(`event-${eventId}`);
    logger.info(`Socket ${socket.id} left event ${eventId}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default server;