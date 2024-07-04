import UserService from "../services/UserService.js";

class UserController {
	async getAllUsers(req, res) {
		try {
			const users = await UserService.getAllUsers();
			return res.status(200).json(users);
		} catch (e) {
			res.status(400).json('Users not found')
		}
	}
	async getOneUser(req, res) {
		try {
			const {login} = req.params;
			console.log(login)
			const user = await UserService.getOneUser(String(login))
			return res.status(200).json(user);
		} catch (e) {
			console.log('404 not found')
			res.status(404).json('User not found')
		}
	}
	// async createUser(req, res) {
	// 	try {
	// 		const {login, password, email} = req.body;
	// 		const findUser = await UserService.getOneUser(login)
	// 		if (findUser.login === login || findUser.password === password) throw new Error('Error. User exists.')
	// 		const newUser = await UserService.createUser(login, password, email)
	// 		return res.status(200).json(newUser)
	// 	} catch (e) {
	// 		res.status(400).json(e.message)
	// 	}
	// }
}

export default new UserController();