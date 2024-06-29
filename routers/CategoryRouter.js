import express from "express";
import CategoryController from '../controllers/CategoryController.js'
const CategoryRouter = express.Router();

CategoryRouter.get('/category', CategoryController.getAll)
CategoryRouter.get('/category/:name', CategoryController.getOne)
CategoryRouter.post('/category', CategoryController.create)
CategoryRouter.put('/category/:name', CategoryController.update)
CategoryRouter.delete('/category/:name', CategoryController.delete)


export default CategoryRouter;