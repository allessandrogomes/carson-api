import express, { Express, Request, Response } from 'express'
import users from './userRoutes.js'
import advertisements from './advertisementsRoutes.js'
import cors from 'cors'

const routes = (app: Express) => {
  app
    .route('/')
    .get((req: Request, res: Response) => res.status(200).send('CarsOn API'))
  app.use(cors())
  app.use(express.json(), users, advertisements)
}

export default routes
