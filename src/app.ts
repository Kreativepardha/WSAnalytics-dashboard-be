import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { config } from 'dotenv'
import { Server } from 'socket.io'
import { ENV } from './config/env'
import { logger } from './utils/logger'
import { apiRateLimiter } from './middlewares/rateLimiter'
import { errorHandler } from './middlewares/errorHandler'
import indexRouter from './routes/index'
import { initWebSocketServer } from './websockets'
import path from 'path';
import { WebSocketServerInstance } from './websockets'


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

app.use(cors())
app.use(express.json())
app.use(apiRateLimiter)
app.use(express.static(path.join(__dirname, './public')));


app.get('/', (_, res) => res.send(`Visitor Analystics API`))
app.use('/api/v1', indexRouter)
initWebSocketServer();
app.use(errorHandler)

httpServer.listen(ENV.PORT, () => {
  logger.info(`Server running on Ws://localhost:${ENV.PORT}`)
})


export default app;



