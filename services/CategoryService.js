import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

class CategoryService {
	async getOne(name){
		if (!name) throw new Error("Undefined name")
		const category = await prisma.category.findUnique({
			where: {
				name: name
			}
		})
		if (!category) {
			throw new Error("This category doesn't exist")
		}
		return category
	}
	async delete(name){
		if (!name) throw new Error("Undefined name")
		const category = await prisma.category.delete({
			where: {
				name: name
			}
		});
		return category;
	}
	async create(name, description) {
		if (!name || !description) {
			throw new Error("Undefined name or description");
		}
		
		const exist = await prisma.category.findUnique({
			where: {
				name: name
			}
		});
		
		if (exist) {
			throw new Error("Category name already exists");
		}
		
		return prisma.category.create({
			data: {
				name: name,
				description: description
			}
		});
	}
	
	async getAll(){
		const categories =  await prisma.category.findMany()
		return categories
	}
	async update(name) {
		if (!name) throw new Error("Undefined name")
		return 0;
	}
}

export default new CategoryService();