import express from "express";
import UserController from "../controllers/UserController.js";
import validateTokenMiddleware from "../middlewares/validateToken.middleware.js";
const UserRouter = express.Router();

UserRouter.get('/user',validateTokenMiddleware,  UserController.getAllUsers);
UserRouter.get('/user/:login',validateTokenMiddleware,  UserController.getOneUser)

export default UserRouter;