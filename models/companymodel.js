import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],

    },

    description: {
        type: String,
        required: [true, "Description is Required"],
    },
    logo: {
        type: String,
        required: [true, "Logo URL or path is required"],
    },
    registeredBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',

    }
}, { timestamps: true }
);

export default mongoose.model("'company", companySchema);
