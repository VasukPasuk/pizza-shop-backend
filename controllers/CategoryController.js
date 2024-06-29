import CategoryService from "../services/CategoryService.js";
class CategoryController {
	async getOne(req, res){
		try {
			const {name} = req.params;
			const category = await CategoryService.getOne(name)
			res.json(category)
		} catch (e) {
			res.status(500).json(e)
		}
	}
	async delete(req, res) {
		const {name} = req.params;
		try {
			const {name} = req.params;
			const category = await CategoryService.delete(name)
			res.json(category)
		} catch (e) {
			res.status(500).json(e)
		}
	}
	async create(req, res){
		try {
			const {name, description} = req.body;
			const category = await CategoryService.create(name, description);
			res.json(category)
		} catch (e) {
			res.status(500).json({error: e.message})
		}
	}
	async getAll(req, res){
		try {
			const categories = await CategoryService.getAll();
			res.json(categories)
		} catch (e) {
			res.status(500).json(e)
		}
	}
	async update(req, res) {
		try {
		
		} catch (e) {
			res.status(500).json(e)
		}
	}
}

export default new CategoryController();