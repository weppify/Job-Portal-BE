import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({

    createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'company',

    },
    jobTitle: {
        type: String,
        required: [true, "jobTitle is Required"]
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Temporary', 'Contract', 'Internship', 'Permanent'],
        required: [true, "jobType is Required"]
    },
    jobdescription: {
        type: String,
        required: [true, "jobdescription is Required"]
    },
    Category: {
        type: String,
        required: [true, "SELECT A CATEGORY "]
    },
    MinSalary: {
        type: String,
        required: [true, "MinSalary is Required"]
    },
    MaxSalary: {
        type: String,
        required: [true, "MaxSalary is Required"]
    },
    ContactEmail: {
        type: String,
        required: [true, "ContactEmail is Required"]
    },
    City: {
        type: String,
        required: [true, "City is Required"]
    },
    tags: {
        type: String,
        required: [true, "tags is Required"]

    }

}, { timestamps: true })
export default mongoose.model('Job', jobSchema)