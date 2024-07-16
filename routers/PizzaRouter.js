import express from "express";
import PizzaController from "../controllers/PizzaController.js";
import validateTokenMiddleware from "../middlewares/validateToken.middleware.js";

const PizzaRouter = express.Router();

PizzaRouter.get('/pizza',validateTokenMiddleware,  PizzaController.getAll)
PizzaRouter.get('/pizza/:id',validateTokenMiddleware,  PizzaController.getOne)
PizzaRouter.post('/pizza',validateTokenMiddleware,  PizzaController.create)
PizzaRouter.put('/pizza/:id',validateTokenMiddleware,  PizzaController.updateFull)
PizzaRouter.patch('/pizza/:id',validateTokenMiddleware,  PizzaController.updatePartial)
PizzaRouter.delete('/pizza', validateTokenMiddleware, PizzaController.deleteAll)
PizzaRouter.delete('/pizza/:id',validateTokenMiddleware,  PizzaController.deleteOne)

export default PizzaRouter;