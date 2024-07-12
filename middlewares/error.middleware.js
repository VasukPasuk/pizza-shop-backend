import HttpError from "../error/HttpError.js";

export default function errorMiddleware(error, req, res, next) {
	if (error instanceof HttpError) {
		return res.status(error.code).json({
			message: error.message
		});
	}
	return res.status(500).json({
		message: 'An unexpected error occurred'
	});
}