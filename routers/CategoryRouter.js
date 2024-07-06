import express from "express";
import {param} from "express-validator"
import CategoryController from '../controllers/CategoryController.js'
const CategoryRouter = express.Router();

CategoryRouter.get('/category', CategoryController.getAll)
CategoryRouter.get('/category/:name', param('name').notEmpty().trim().isString() , CategoryController.getOne)
CategoryRouter.post('/category', CategoryController.create)
CategoryRouter.put('/category/:name', CategoryController.update)
CategoryRouter.delete('/category/:name', CategoryController.delete)


export default CategoryRouter;