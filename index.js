import express from 'express';
import dotenv from 'dotenv';
import {PrismaClient} from "@prisma/client";
import CategoryRouter from "./routers/CategoryRouter.js";
dotenv.config()
const prisma = new PrismaClient()

const app = express();
app.use(express.json())
app.use('/api', CategoryRouter)
const port = process.env.PORT || 4000;



try {
	app.listen(port, () => {
		console.log(`Ok`);
	});
} catch (error) {
	prisma.$disconnect()
	console.log(error.message)
}
