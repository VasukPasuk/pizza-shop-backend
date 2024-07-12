import TokenService from "../services/TokenService.js";
import HttpError from "../error/HttpError.js";

export default function validateTokenMiddleware(req, res, next) {
	const authHeader = req.headers["Authorization"];
	if (!authHeader) throw HttpError.UnAuthorized()
	
	const token = authHeader.split(' ')[1];
	if (!token) throw HttpError.UnAuthorized()
	
	const userData = TokenService.validateAccessToken(token);
	if(!userData) throw HttpError.UnAuthorized()
	
	req.user = userData;
	
	next()
}