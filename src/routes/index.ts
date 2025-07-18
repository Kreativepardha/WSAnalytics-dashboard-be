import { Router } from "express";
import eventRoutes from './events.routes'
import analyticsRoutes from './analytics.routes'

const router = Router()

router.use('/events', eventRoutes);
router.use('/analytics', analyticsRoutes);


export default router