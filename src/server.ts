import express from 'express'
import app from './app'
import { ENV } from './config/env'
import { logger } from './utils/logger'





app.listen(ENV.PORT, () => {
    
    logger.info(`Server is listening on http://localhost:${ENV.PORT}`)    
             
})
