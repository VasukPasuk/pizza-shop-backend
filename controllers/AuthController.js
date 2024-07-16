import prisma from "../index.js";
import AuthService from "../services/AuthService.js";

class AuthController {
	async register(req, res) {
		try {
			const {login, password, email} = req.body;
			const {accessToken, refreshToken, user} = await AuthService.register({login, password, email});
			res.cookie('refreshToken', refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})
			res.json({accessToken, user})
		} catch (e) {
			return res.status(400).json('Error')
		}
	}
	async login(req, res) {
		try {
		
		} catch (e) {
			return res.status(400).json('Error')
		}
	}
	async logout(req, res) {
		try {
		
		} catch (e) {
			return res.status(400).json('Error')
		}
	}
	async refresh(req, res) {
		try {
		
		} catch (e) {
			return res.status(400).json('Error')
		}
	}
	async activate(req, res) {
		try {
			const { link } = req.params;
			const user = await AuthService.activate(link)
			res.status(200).json(user);
		} catch (e) {
			return res.status(400).json('Error')
		}
	}
}

export default new AuthController();
