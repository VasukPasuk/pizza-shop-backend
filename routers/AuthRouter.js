import express from "express";
import AuthController from "../controllers/AuthController.js";
const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.get('/activate/:link', AuthController.activate);
AuthRouter.get('/refresh', AuthController.refresh);

export default AuthRouter;