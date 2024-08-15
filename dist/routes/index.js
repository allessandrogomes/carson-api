import express from 'express'
import users from './userRoutes.js'
import advertisements from './advertisementsRoutes.js'
import cors from 'cors'
const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('CarsOn API'))
  app.use(cors())
  app.use(express.json(), users, advertisements)
}
export default routes
