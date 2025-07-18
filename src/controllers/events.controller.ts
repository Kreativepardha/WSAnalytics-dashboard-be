import type { Request, Response, NextFunction } from 'express';
import { handleVisitorEvent } from '../services/events.services';

export const postVisitorEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await handleVisitorEvent(req.body);
    res.status(201).json({ message: 'Event recorded', data: result });
  } catch (err) {
    next(err);
  }
};
