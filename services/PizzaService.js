import prisma from "../index.js";

class PizzaService {
	async getAll() {
		return prisma.pizza.findMany();
	}
	async getOne(id) {
		const pizzaId = id;
		return prisma.pizza.findUnique({
			where: {
				id: id
			}
		})
	}
	async create(data) {
		return prisma.pizza.create({
			data: {...data}
		})
	}
	async deleteAll() {
		return prisma.pizza.deleteMany()
	}
	async deleteOne(id) {
		return prisma.pizza.delete({
			where: {
				id: id
			}
		})
	}
	async updateFull(id, data) {
		return prisma.pizza.update({
			where: {
				id: id
			},
			data: {
				...data
			}
		})
	}
	async updatePartial(id, data) {
		return prisma.pizza.update({
			where: {
				id: id
			},
			data: {
				...data
			}
		})
	}
}

export default new PizzaService();