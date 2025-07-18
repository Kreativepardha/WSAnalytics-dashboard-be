import { Router } from 'express';
import { postVisitorEvent } from '../controllers/events.controller';

const router = Router();

router.post('/', postVisitorEvent);

export default router;
