import jwt from 'jsonwebtoken'

class TokenService {
	static createTokenPair(id, login, email) {
		const accessToken = jwt.sign(
			{ userId: id, login: login, email: email, role: "CUSTOMER" },
			process.env.ACCESS_TOKEN_SECRET_KEY,
			{ expiresIn: '15m' }
		);
		
		const refreshToken = jwt.sign(
			{ userId: id, login: login, email: email, role: "CUSTOMER" },
			process.env.REFRESH_TOKEN_SECRET_KEY,
			{ expiresIn: '30d' }
		);
		
		return { accessToken, refreshToken };
	}
	
	static createAccessToken(id, login, email) {
		return jwt.sign(
			{ userId: id, login: login, email: email, role: "CUSTOMER" },
			process.env.REFRESH_TOKEN_SECRET_KEY,
			{ expiresIn: '15m' }
		);
	}
	
	static validateAccessToken(token) {
		return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
	}
}

export default TokenService