import prisma from "../index.js";
import bcrypt from "bcrypt";

class UserService {
	async getAllUsers() {
		const users = prisma.user.findMany();
		if (!users) {
			throw new Error("Error, users not found");
		}
		return users;
	}
	
	async getOneUser(login) {
		const user = await prisma.user.findUnique({
			where: {
				login: login
			}
		});
		if (!user) {
			throw new Error("Error, user doesn't exist.");
		}
		return user;
	}
	
	async createUser(login, password, email) {
		const salt = bcrypt.genSalt(20);
		const encryptedPassword = bcrypt.hash(password, salt)
		const newUser = await prisma.user.create({
			data: {
				login: login,
				password: encryptedPassword,
				email: email
			}
		});
		if (!newUser) {
			throw new Error("Error, user can't be created");
		}
		return newUser;
	}
	
	// async checkUser(login) {
	// 	const user = await prisma.user.findUnique({
	// 		where: {
	// 			login: login
	// 		}
	// 	});
	// 	return Boolean(user)
	// }
}

export default new UserService();