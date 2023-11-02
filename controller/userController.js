import usermodel from "../models/usermodel.js";





export const updateuser = async (req, res, next) => {
    const { name, Phone } = req.body
    if (!name || !Phone) {
        next("Please Provide all Field");
    }
    const user = await usermodel.findOne({ _id: req.user.userId });
    user.name = name
    user.Phone = Phone
    await user.save();
    const token = user.createJWT();
    res.status(200).json({
        user: {
            userType: user.userType,
            name: user.name,
            email: user.email,
            Phone: user.Phone
        },
        token,
    })


}