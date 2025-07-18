import { Router } from 'express';
import { getSummary, getSessions } from '../controllers/analytics.controller';

const router = Router();

router.get('/summary', getSummary);
router.get('/sessions', getSessions);

export default router;
