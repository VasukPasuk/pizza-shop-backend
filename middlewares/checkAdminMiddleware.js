import * as jwt from "jsonwebtoken"

function checkAdminMiddleware(req, res, next) {
	const authHeader = req.headers["Authorization"]
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(403).json("No token bro.")
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded.role !== 'admin') {
			return res.status(403).json({ error: "Access denied. Admin role required." });
		}
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}

export default checkAdminMiddleware