import usermodel from "../models/usermodel.js";

export const TestController = (req, res) => {
    res.status(200).send("Hello ");
}

export const registerController = async (req, res, next) => {

    var { userType, name, email, Phone, Password } = req.body;
    if (!name) {
        next("Name is Required");


    }
    if (!email) {
        next("Email is Required");
    }
    if (!Phone) {
        Phone = "";
    }
    if (!Password) {
        next("Password is Required");
    }

    const exist = await usermodel.findOne({ email });
    if (exist) {
        res.status(500).json({
            success: false,
            message: "User Already Exist",


        })

    }

    const user = await usermodel.create({ userType, name, email, Phone, Password });


    //Tokken 

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user: {
            userType: user.userType,
            name: user.name,
            email: user.email,
            Phone: user.Phone
        },

    })

}
export const Logincontroller = async (req, res, next) => {
    const { email, Password } = req.body
    if (!email || !Password) {
        next("Please Provide All Fields")
    }


    // Find by Email
    const user = await usermodel.findOne({ email }).select("+Password");
    if (!user) {
        next("User not Found");
        return;
    }
    const ismatch = await user.comaprepass(Password, user);

    if (!ismatch) {
        next('Invalid Username or Password')
        return;
    }
    user.Password = undefined;
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: user,
        token,
    })
}


//GET USER
export const GETUSER = async (req, res, next) => {
    try {

        const user = usermodel.findById({ _id: req.body.user.userId })
        console.log(req.body.user.userId)
        user.Password = undefined;

        if (!user) {
            return res.status(200).send({
                message: "User Not Found", success: false
            })
        }
        else {
            res.status(200).send({
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


export const GETALLUSER = async (req, res, next) => {
    try {
        const user = await usermodel.find({}).select("-Password");

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
export const getimage = (req, res) => {
    console.log(req.body.logo)
    let img = require("../public/companylogos/" + req.body.logo);
    res.status(200).send(img)
}