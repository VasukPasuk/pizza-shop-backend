class HttpError extends Error {
	code
	constructor(code, message) {
		super(message)
		this.code = code
	}
	static BadRequest(message="Bad request.") {
		return new HttpError(400, message)
	}
	
	static UnAuthorized(message="Not authorized.") {
		return new HttpError(401, message)
	}
	
	static Forbidden(message="Warning! Forbidden access.") {
		return new HttpError(403, message)
	}
	
	static NotFound(message="Not found") {
		return new HttpError(404, message)
	}
}

export default HttpError