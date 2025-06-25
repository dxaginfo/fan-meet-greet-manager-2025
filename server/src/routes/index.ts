import { Express } from 'express';
import { notFoundHandler } from '../middleware/errorHandler';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import eventRoutes from './event.routes';
import ticketRoutes from './ticket.routes';
import merchandiseRoutes from './merchandise.routes';
import virtualMeetingRoutes from './virtualMeeting.routes';
import analyticsRoutes from './analytics.routes';

/**
 * Configure all API routes
 * @param app Express application
 */
export const configureRoutes = (app: Express): void => {
  // API health check
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API version prefix
  const apiPrefix = '/api/v1';

  // Register routes
  app.use(`${apiPrefix}/auth`, authRoutes);
  app.use(`${apiPrefix}/users`, userRoutes);
  app.use(`${apiPrefix}/events`, eventRoutes);
  app.use(`${apiPrefix}/tickets`, ticketRoutes);
  app.use(`${apiPrefix}/merchandise`, merchandiseRoutes);
  app.use(`${apiPrefix}/virtual-meetings`, virtualMeetingRoutes);
  app.use(`${apiPrefix}/analytics`, analyticsRoutes);

  // Catch 404 routes
  app.use(notFoundHandler);
};