import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URL)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;