import express from "express";
const UserRouter = express.Router();

UserRouter.get('/user', (req, res) => {

});
UserRouter.get('/user:id', (req, res) => {
	const {id} = req.params;
})

export default UserRouter;