import prisma from "../index.js";
import bcrypt from 'bcrypt';
import * as uuid from "uuid"
import TokenService from "./TokenService.js";
import HttpError from "../error/HttpError.js";

class AuthService {
	async register({login, password, email}) {
		// Validate
		if (!login.trim() || !password.trim() || !email.trim()) {
			throw new HttpError.BadRequest();
		}
		// Check if the user already exists in DB
		const userExist = await prisma.user.findUnique({
			where: {
				login: login
			}
		})
		
		// If true -> user exists, so return error with message
		if (userExist) {
			throw new Error("Register failed. User with such params exists.")
		}
		// Salt. Yes. Salt.
		
		const salt = await bcrypt.genSalt(15)
		
		// Hashed password, because it's bad practise to store original password in Database
		const hashedPassword = await bcrypt.hash(String(password), salt)
		
		// Generated hashed string to create activation "link" for user
		const userActivationLink = uuid.v4();
		
		// Create user in DB
		const user = await prisma.user.create({
			data: {
				login: login,
				email: email,
				password: hashedPassword,
				activation_link: userActivationLink
			}
		})
		
		// User id which has been created in DB
		const { id } = user;
		
		// Created token pair with user id, login and email
		const {accessToken, refreshToken} = TokenService.createTokenPair(id, login, email)
		
		// Return object with token pair and user
		return {
			refreshToken: refreshToken,
			accessToken: accessToken,
			user: user,
		}
	}
	
	async authenticateUser(identifier, password, identifierType = 'login') {
		// Define the criteria based on identifierType
		const criteria = {};
		criteria[identifierType] = identifier;
		
		// Fetch user details based on the criteria
		const user = await prisma.user.findUnique({
			where: criteria,
			select: {
				password: true,
				id: true
			}
		});
		
		// Check if user exists
		if (!user) {
			throw new Error("User doesn't exist.");
		}
		const { user_password } = user;
		
		// Compare the provided password with the hashed password in the database
		const isPasswordValid = await bcrypt.compare(password, user_password);
		
		// Check if the password is valid
		if (!isPasswordValid) {
			throw new Error("Invalid user password.");
		}
		
		return true;
	}
	
	async loginByLogin({ login, password }) {
		return this.authenticateUser(login, password, 'login');
	}
	
	async loginByEmail({ email, password }) {
		return this.authenticateUser(email, password, 'email');
	}
	
	
	async logout() {
	
	}
	
	async activate(link) {
		const isValidLink = await prisma.user.findUnique({
			where: {
				activation_link: link
			},
			select: {
				id: true
			}
		})
		if (!isValidLink) {
			throw new Error("Invalid link.")
		}
		
		const { id } = isValidLink;
		
		const activatedUser = await prisma.user.update({
			where: {
				id: id
			},
			data: {
				activated: true
			}
		})
		if (!activatedUser) {
			throw new Error("Ups... Error")
		}
		return activatedUser
	}
	
	async refresh(userId) {
	
	}
}

export default new AuthService();