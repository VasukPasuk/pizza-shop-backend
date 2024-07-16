import express from "express";
import {param} from "express-validator"
import CategoryController from '../controllers/CategoryController.js'
import validateTokenMiddleware from "../middlewares/validateToken.middleware.js";
const CategoryRouter = express.Router();

CategoryRouter.get('/category',validateTokenMiddleware, CategoryController.getAll)
CategoryRouter.get('/category/:name',validateTokenMiddleware, param('name').notEmpty().trim().isString() , CategoryController.getOne)
CategoryRouter.post('/category',validateTokenMiddleware, CategoryController.create)
CategoryRouter.put('/category/:name',validateTokenMiddleware, CategoryController.update)
CategoryRouter.delete('/category/:name',validateTokenMiddleware, CategoryController.delete)


export default CategoryRouter;