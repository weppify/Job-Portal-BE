import express from "express";
import { Logincontroller, registerController } from "../controller/Controller.js";

const Router = express.Router()

Router.post('/register', registerController)

// LOGIN || POST 

Router.post('/login', Logincontroller);
export default Router;