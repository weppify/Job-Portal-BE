import express from "express"
import userAuth from "../middlewares/authMiddleware.js";
import { Retrievejobs, UpdateJob, deletejob, jobCreateController, jobstat, searchjobs, GETALLJOBS, findonejob } from "../controller/jobController.js";
import cors from "cors"

const Router = express.Router();
//CREATE JOB POST
Router.post('/create-job', userAuth, jobCreateController)
Router.post("/findonejob", findonejob)
//GET JOBS
Router.post('/get-jobs', userAuth, Retrievejobs)

Router.post("/alljobs", userAuth, GETALLJOBS);
//Update JOBS PUT
Router.patch('/updatejob/:id', userAuth, UpdateJob)
//DELETE JOBS PUT
Router.delete('/deletejob/:id', userAuth, deletejob)
//GET Filter Stats
Router.get("/get-stat", userAuth, jobstat)
//GET SEARCH JOB
Router.post("/search-job", searchjobs);
export default Router