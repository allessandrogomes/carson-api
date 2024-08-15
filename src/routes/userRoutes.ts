import express from 'express'
import UserController from '../controllers/userController.js'

const routes = express.Router()

routes.get('/users', UserController.listUsers)
routes.post('/user/check-email', UserController.checkEmailExists)
routes.post('/user/register', UserController.registerUser)
// routes.get("/users/search", UserController.listUserByState);
// routes.get("/users/:id", UserController.listUserById);
// routes.put("/users/:id", UserController.updateUser);
// routes.delete("/users/:id", UserController.deleteUser);

export default routes
