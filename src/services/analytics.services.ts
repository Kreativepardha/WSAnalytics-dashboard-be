import { prisma } from '../config/db';
import { startOfDay } from 'date-fns';
import { activeSessionsMap } from './events.services';

export const getSummaryStats = async () => {
  const todayStart = startOfDay(new Date());

  const totalToday = await prisma.visitorEvent.count({
    where: {
      timestamp: { gte: todayStart },
    },
  });

  const allEvents = await prisma.visitorEvent.findMany({
    where: { timestamp: { gte: todayStart } },
    select: { page: true },
  });

  const pagesVisited: Record<string, number> = {};
  allEvents.forEach(({ page }) => {
    pagesVisited[page] = (pagesVisited[page] || 0) + 1;
  });

  return {
    totalActive: activeSessionsMap.size,
    totalToday,
    pagesVisited,
  };
};

export const getActiveSessions = () => {
  const sessions: any[] = [];

  for (const [sessionId, session] of activeSessionsMap.entries()) {
    sessions.push({
      sessionId,
      currentPage: session.journey.at(-1),
      journey: session.journey,
      duration: Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000),
    });
  }

  return sessions;
};
