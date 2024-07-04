import PizzaService from "../services/PizzaService.js";

class PizzaController {
	async getAll(req, res) {
		try {
			const pizza = await PizzaService.getAll();
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params
			const pizza = await PizzaService.getOne(id);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async create(req, res) {
		try {
			const data = req.body
			const pizza = await PizzaService.create(data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async deleteAll(req, res) {
		try {
			const pizza = await PizzaService.deleteAll();
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async deleteOne(req, res) {
		try {
			const {id} = req.params
			const pizza = await PizzaService.deleteOne(id);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async updateFull(req, res) {
		try {
			const {id, data} = req.body;
			const pizza = await PizzaService.updateFull(id, data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
	async updatePartial(req, res) {
		try {
			const {id, data} = req.body;
			const pizza = await PizzaService.updatePartial(id, data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
			res.status(400).json('Error');
		}
	}
}

export default new PizzaController();