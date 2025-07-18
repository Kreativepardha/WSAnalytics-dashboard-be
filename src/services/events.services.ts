import { prisma } from '../config/db';
import { logger } from '../utils/logger';
import { eventSchema } from '../validations/events.validation';

// In-memory session tracker
const activeSessions = new Map<string, {
  journey: string[],
  startedAt: Date,
}>();

export const handleVisitorEvent = async (data: unknown) => {
  const parsed = eventSchema.parse(data);
  const { type, page, sessionId, timestamp, country, metadata } = parsed;

  const event = await prisma.visitorEvent.create({
    data: {
      type,
      page,
      sessionId,
      timestamp: new Date(timestamp),
      country,
      metadata,
    },
  });

  // Initialize session if not present
  if (!activeSessions.has(sessionId)) {
    activeSessions.set(sessionId, {
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
    const session = activeSessions.get(sessionId)!;
    if (!session.journey.includes(page)) {
      session.journey.push(page);
    }
  }

  // Handle session end
  if (type === 'session_end') {
    activeSessions.delete(sessionId);
  }

  // WebSocket broadcast
  WebSocketServerInstance.emitVisitorUpdate(event);
  WebSocketServerInstance.emitSessionActivity(sessionId, activeSessions.get(sessionId));

  logger.info('Visitor event processed', { sessionId, type });

  return event;
};
