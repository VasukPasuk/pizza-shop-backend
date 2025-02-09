import express from 'express';

// Helper modules
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// Prisma
import {PrismaClient} from "@prisma/client"

// Imported Routes
import CategoryRouter from "./routers/CategoryRouter.js";
import UserRouter from "./routers/UserRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import PizzaRouter from "./routers/PizzaRouter.js";
import checkAdminMiddleware from "./middlewares/checkAdminMiddleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import validateTokenMiddleware from "./middlewares/validateToken.middleware.js";

dotenv.config()

const prisma = new PrismaClient()

const app = express();

// Middlewares
app.use(express.static('public'))
app.use(express.json());
app.use(cors());
app.use(cookieParser())

// Register Routers
app.use('/api', CategoryRouter);
app.use('/api', UserRouter)
app.use('/api/auth/', AuthRouter)
app.use('/api', PizzaRouter)

app.use(errorMiddleware)

const port = process.env.PORT || 4000;

async function main() {
	try {
		app.listen(port, () => {
			console.log(`Ok`);
		});
	} catch (error) {
		await prisma.$disconnect();
		console.log(error.message);
	}
}

main().catch(err => console.log("Error."))

export default prisma;