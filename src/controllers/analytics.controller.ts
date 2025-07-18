import type { Request, Response, NextFunction } from 'express';
import { getActiveSessions, getSummaryStats } from '../services/analytics.services';

export const getSummary = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await getSummaryStats();
    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
};

export const getSessions = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const sessions = getActiveSessions();
    res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};
