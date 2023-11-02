import express from "express"
import userAuth from "../middlewares/authMiddleware.js";
import { updateuser } from "../controller/userController.js";
import { GETUSER, GETALLUSER, getimage } from "../controller/Controller.js";

const Router = express.Router();
//GET USER
Router.post("/getuser", userAuth, GETUSER)

Router.post("/alluser", userAuth, GETALLUSER);

Router.post("/getimage", getimage)
//UPDATE USER
Router.put('/update-user', userAuth, updateuser)

export default Router;