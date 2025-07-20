import { prisma } from '../config/db';
import { logger } from '../utils/logger';
import { eventSchema } from '../validations/events.validation';
import { WebSocketServerInstance } from '../websockets';
import { emitStatsUpdate } from './analytics.services';

export const activeSessionsMap = new Map<string, {
  journey: string[];
  startedAt: Date;
}>();

export const handleVisitorEvent = async (data: unknown) => {
  const parsed = eventSchema.parse(data);
  const { type, page, sessionId, timestamp, country, metadata } = parsed;

  // Initialize session if not present
  if (!activeSessionsMap.has(sessionId)) {
    activeSessionsMap.set(sessionId, {
      journey: [page],
      startedAt: new Date(timestamp),
    });

    await prisma.session.create({
      data: {
        sessionId,
        country,
      },
    });
  } else {
    const session = activeSessionsMap.get(sessionId)!;
    if (!session.journey.includes(page)) {
      session.journey.push(page);
    }
  }
  
  const event = await prisma.visitorEvent.create({
    data: {
      type,
      page,
      sessionId,
      timestamp: new Date(timestamp),
      country,
      metadata: metadata as any,
    },
  });
  
  // Handle session end
  if (type === 'session_end') {
    activeSessionsMap.delete(sessionId);
  }

  // WebSocket broadcast
  WebSocketServerInstance.emitVisitorUpdate(event);
  WebSocketServerInstance.emitSessionActivity(sessionId, activeSessionsMap.get(sessionId));
  
  // Emit updated stats
  await emitStatsUpdate();

  logger.info('Visitor event processed', { sessionId, type });

  return event;
};
