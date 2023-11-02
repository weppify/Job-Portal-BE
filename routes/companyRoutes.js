import express from "express"
import userAuth from "../middlewares/authMiddleware.js";
import { CreatejobController, RetrieveCompanies, Updatecompany, deletecompany, GETALLCOMPANIES, RetrieveCompany, GETALLCOMPANIES2 } from "../controller/companyController.js";
import cors from "cors"
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/companylogos')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})

//Create Comapany || POST
const Router = express.Router()
Router.post('/create-company', userAuth, upload.single('logo'), CreatejobController)
Router.post('/get-comapnies', userAuth, RetrieveCompanies)
Router.post('/allcompanies', userAuth, GETALLCOMPANIES)
Router.post('/allcompanies2', GETALLCOMPANIES2)
Router.post('/get-comapny', RetrieveCompany)
//Update JOBS PUT
Router.patch('/updatecompany/:id', userAuth, Updatecompany)
//DELETE JOBS PUT
Router.delete('/deletecompany/:id', userAuth, deletecompany)
export default Router;