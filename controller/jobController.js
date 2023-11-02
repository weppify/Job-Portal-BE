import mongoose from "mongoose";
import jobsmodel from "../models/jobsmodel.js";
import companymodel from "../models/companymodel.js";

export const jobCreateController = async (req, res, next) => {
    const { createdby, jobTitle, jobType, jobdescription, Category, MinSalary, MaxSalary, ContactEmail, City, tags } = req.body;


    const job = await jobsmodel.create({ createdby, jobTitle, jobType, jobdescription, Category, MinSalary, MaxSalary, ContactEmail, City, tags });
    res.status(200).send({ createdby, jobTitle, jobType, jobdescription, Category, MinSalary, MaxSalary, ContactEmail, City, tags });
}

export const findonejob = async (req, res) => {
    const job = await jobsmodel.find({ _id: req.body._id });
    res.status(200).send({

        job: job,
    })
}
export const Retrievejobs = async (req, res, next) => {

    const userId = req.body.userId; // Assuming you get the user's ID from the request

    // Step 1: Retrieve Company IDs created by the user
    const companiesCreatedByUser = await companymodel.find({ registeredBy: userId });
    const companyIds = companiesCreatedByUser.map(company => company._id);

    // Step 2: Retrieve Jobs posted by the companies
    const userJobs = await jobsmodel.find({ createdby: { $in: companyIds } });

    res.status(200).send({
        totalUserJobs: userJobs.length,
        data: userJobs
    });

};
//UPDATE CONTROLLER
export const UpdateJob = async (req, res, next) => {
    const { id } = req.params;
    const { jobType, jobTitle, Category, MinSalary, MaxSalary, ContactEmail, City } = req.body;
    if (!jobType || !jobTitle || !Category || !MinSalary || !MaxSalary || !ContactEmail || !City) {
        next("Please Provide All Fields");
    }
    const job = await jobsmodel.findOne({ _id: id })
    if (!job) {
        next(`No Jobs Found witht this id ${id}`)
    }
    if (req.user.userId != job.createdby.toString()) {

        next("You are Not Authorize to update this job")

    }
    const updatejob = await jobsmodel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ updatejob });
}

//DELETE CONTROLLER
export const deletejob = async (req, res, next) => {

    const { id } = req.params
    const job = await jobsmodel.findOne({ _id: id });
    if (!job) {
        next(`No Jobs Found witht this id ${id}`)
    }
    if (req.user.userId != job.createdby.toString()) {

        next("You are Not Authorize to delete this job")
        return
    }

    await jobsmodel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Job Deleted" });
}

// GET STAT
export const jobstat = async (req, res) => {
    const stat = await jobsmodel.aggregate([
        {
            $match: {
                createdby: new mongoose.Types.ObjectId(req.user.userId),
            },

        },
        {
            $group: {
                _id: "$createdAt",
                count: { $sum: 1 },
            }
        },
    ]);
    res.status(200).json({
        totaljob: stat.length,
        stat
    })
}
export const searchjobs = async (req, res) => {
    const { jobType, City, jobTitle, Category } = req.query
    const queryobject = {
        job: null
    }
    if (jobType) {
        queryobject.jobType = jobType;

    }
    if (City) {
        queryobject.City = City;
    }

    if (jobTitle) {
        queryobject.jobTitle = { $regex: jobTitle, $options: "i" };
    }
    if (Category) {
        queryobject.Category = Category;
    }
    let queryresult = await jobsmodel.find(queryobject);
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * 1;
    const lastIndex = (page) * limit;

    const results = {}
    results.totaljob = queryresult.length
    results.pagecount = Math.ceil(queryresult.length / limit);
    if (lastIndex < queryresult.length) {
        results.next = {
            page: page + 1,
        }
    }
    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
        }
    }


    results.job = queryresult.slice(startIndex, lastIndex);
    console.log(results)

    res.status(200).json({
        results
    })

}

export const GETALLJOBS = async (req, res, next) => {
    try {
        const user = await jobsmodel.find({});

        if (!user) {
            return res.status(200).send({
                message: "User Not Found", success: false
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: user,
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Auth Error",
            success: false,
            error: error.message
        })
    }
}