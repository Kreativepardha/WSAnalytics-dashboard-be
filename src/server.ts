import express from 'express'
import app from './app'





app.listen(config.port, () => {
    
    logger.info(`Server is listening on http://localhost:${config.port}`)    
             
})
