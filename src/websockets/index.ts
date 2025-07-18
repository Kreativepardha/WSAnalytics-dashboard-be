import { Server } from 'socket.io';
import { logger } from '../utils/logger';

let io: Server;
let totalDashboards = 0;

type SessionInfo = {
  journey: string[];
  startedAt: Date;
};

export const initWebSocketServer = (server: any) => {
  io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    totalDashboards++;
    logger.info(`Dashboard connected: ${socket.id}`);
    
    io.emit('user_connected', {
      type: 'user_connected',
      data: {
        totalDashboards,
        connectedAt: new Date().toISOString(),
      },
    });

    socket.on('disconnect', () => {
      totalDashboards--;
      logger.info(`Dashboard disconnected: ${socket.id}`);
      io.emit('user_disconnected', {
        type: 'user_disconnected',
        data: { totalDashboards },
      });
    });

    socket.on('request_detailed_stats', (payload) => {
      logger.debug('Received request_detailed_stats', payload);
      // optional: trigger a filter or stat computation
    });

    socket.on('track_dashboard_action', (payload) => {
      logger.info('Dashboard Action', payload);
    });
  });

  logger.info('✅ WebSocket server initialized');
};

export const WebSocketServerInstance = {
  emitVisitorUpdate: (event: any) => {
    io.emit('visitor_update', {
      type: 'visitor_update',
      data: {
        event,
        stats: {
          // placeholder stats — update once logic is added
          totalActive: 5,
          totalToday: 150,
          pagesVisited: { '/home': 45, '/products': 30 },
        },
      },
    });
  },

  emitSessionActivity: (sessionId: string, session: SessionInfo | undefined) => {
    if (!session) return;
    io.emit('session_activity', {
      type: 'session_activity',
      data: {
        sessionId,
        currentPage: session.journey.at(-1),
        journey: session.journey,
        duration: Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000),
      },
    });
  },
};
