import express from "express";
const PizzaRouter = express.Router();

PizzaRouter.get('/pizza', (req, res) => {

});
PizzaRouter.get('/pizza:id', (req, res) => {
	const {id} = req.params;
})
PizzaRouter.post('/pizza', (req, res) => {

})

export default PizzaRouter;