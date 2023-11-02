import companymodel from "../models/companymodel.js";



export const CreatejobController = async (req, res, next) => {

    const { name, description, registeredBy } = req.body;
    if (!name || !description) {
        next("Please Provide All Fields");
    }



    const company = await companymodel.create({ name: name, description: description, logo: req.file.filename, registeredBy: registeredBy });

    res.status(201).json({ company });
}

export const RetrieveCompanies = async (req, res, next) => {
    const company = await companymodel.find({ registeredBy: req.body.userid });
    res.status(200).send({
        totalcompanies: company.length,
        data: company
    })

}

export const Updatecompany = async (req, res, next) => {


    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
        next("Please Provide All Fields");
    }
    const company = await companymodel.findOne({ _id: id })
    if (!company) {
        next(`No Company Found witht this id ${id}`)
    }
    if (req.user.userId != company.registeredBy.toString()) {

        next("You are Not Authorize to update this Company")

    }
    const update_company = await companymodel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ update_company });

}
export const deletecompany = async (req, res, next) => {
    const { id } = req.params
    const company = await companymodel.findOne({ _id: id });
    if (!company) {
        next(`No company Found witht this id ${id}`)
    }
    if (req.user.userId != company.registeredBy.toString()) {

        next("You are Not Authorize to delete this company")
        return
    }

    await companymodel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Company Deleted" });
}

export const GETALLCOMPANIES = async (req, res, next) => {
    try {
        const user = await companymodel.find({});

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
export const GETALLCOMPANIES2 = async (req, res) => {
    try {
        const user = await companymodel.find({});

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

export const RetrieveCompany = async (req, res) => {
    console.log(req.body.createdby);
    const user = await companymodel.findById({ _id: req.body.createdby });
    console.log(user);
    res.status(200).json({
        companyname: user
    })

}