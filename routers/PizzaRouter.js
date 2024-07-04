import express from "express";
import PizzaController from "../controllers/PizzaController.js";

const PizzaRouter = express.Router();

PizzaRouter.get('/pizza', PizzaController.getAll)
PizzaRouter.get('/pizza/:id', PizzaController.getOne)
PizzaRouter.post('/pizza', PizzaController.create)
PizzaRouter.put('/pizza/:id', PizzaController.updateFull)
PizzaRouter.patch('/pizza/:id', PizzaController.updatePartial)
PizzaRouter.delete('/pizza', PizzaController.deleteAll)
PizzaRouter.delete('/pizza/:id', PizzaController.deleteOne)

export default PizzaRouter;