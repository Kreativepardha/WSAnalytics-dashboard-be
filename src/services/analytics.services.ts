import { prisma } from '../config/db';
import { startOfDay } from 'date-fns';
import { activeSessionsMap } from './events.services';
import { WebSocketServerInstance } from '../websockets';

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

// Function to emit real-time stats updates
export const emitStatsUpdate = async () => {
  const stats = await getSummaryStats();
  
  // Emit stats update to all connected dashboards
  WebSocketServerInstance.emitVisitorUpdate({
    type: 'stats_update',
    data: {
      stats: {
        totalActive: stats.totalActive,
        totalToday: stats.totalToday
      }
    }
  });
};

// Function to get filtered stats
export const getFilteredStats = async (filter: { country?: string; page?: string }) => {
  const todayStart = startOfDay(new Date());
  const whereClause: any = {
    timestamp: { gte: todayStart },
  };

  if (filter.country) {
    whereClause.country = filter.country;
  }

  if (filter.page) {
    whereClause.page = filter.page;
  }

  const filteredEvents = await prisma.visitorEvent.findMany({
    where: whereClause,
    orderBy: { timestamp: 'desc' },
    take: 50,
  });

  return {
    events: filteredEvents,
    count: filteredEvents.length,
    filter
  };
};
