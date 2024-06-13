import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/users", UserController.listUsers);
routes.get("/users/search", UserController.listUserByState);
routes.get("/users/:id", UserController.listUserById);
routes.post("/register", UserController.registerUser);
routes.put("/users/:id", UserController.updateUser);
routes.delete("/users/:id", UserController.deleteUser);

export default routes;