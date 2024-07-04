import express from "express";
import UserController from "../controllers/UserController.js";
const UserRouter = express.Router();

UserRouter.get('/user', UserController.getAllUsers);
UserRouter.get('/user/:login', UserController.getOneUser)

export default UserRouter;