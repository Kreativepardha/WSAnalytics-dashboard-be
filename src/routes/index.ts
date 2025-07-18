import { Router } from "express";
import eventRoutes from './events.routes'
const router = Router()

router.use('/events', eventRoutes);


export default router