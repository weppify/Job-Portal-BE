import express from "express";
import { TestController } from "../controller/Controller.js";
import userAuth from "../middlewares/authMiddleware.js";
import cors from "cors"

//Routes
const Router = express.Router();
Router.post('/test', cors, userAuth, TestController)


export default Router