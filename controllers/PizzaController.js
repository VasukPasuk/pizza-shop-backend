import PizzaService from "../services/PizzaService.js";

class PizzaController {
	async getAll(req, res) {
		try {
			const pizza = await PizzaService.getAll();
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params
			const pizza = await PizzaService.getOne(id);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async create(req, res) {
		try {
			const data = req.body
			const pizza = await PizzaService.create(data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async deleteAll(req, res) {
		try {
			const pizza = await PizzaService.deleteAll();
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async deleteOne(req, res) {
		try {
			const {id} = req.params
			const pizza = await PizzaService.deleteOne(id);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async updateFull(req, res) {
		try {
			const {id, data} = req.body;
			const pizza = await PizzaService.updateFull(id, data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
	async updatePartial(req, res) {
		try {
			const {id, data} = req.body;
			const pizza = await PizzaService.updatePartial(id, data);
			return res.status(200).json(pizza)
		} catch (e) {
			console.log(e.message);
		}
	}
}

export default new PizzaController();