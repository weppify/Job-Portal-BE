

import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";

//Security Library
import helmet from "helmet"
import xss from "xss-clean"
import ExpressMongoSanitize from "express-mongo-sanitize";
//imports
import connectDB from "./config/dbconfig.js";
import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errormiddleware.js";
import UserRoutes from "./routes/UserRoutes.js"
import CompanyRoutes from "./routes/companyRoutes.js"
import jobsRoutes from "./routes/jobsRoutes.js"



//DOTENV CONFIG 
dotenv.config();

//Mongoose Connect
connectDB();
//rest object
const app = express()




app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static('/public'))
//routes
app.use('/api/v1/test', testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/company", CompanyRoutes);
app.use("/api/v1/job", jobsRoutes);
//Error Middleware

app.use(errorMiddleware)
const PORT = process.env.PORT
//listen
app.listen(PORT)