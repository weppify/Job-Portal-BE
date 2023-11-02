import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
const Userschema = new mongoose.Schema({

    userType: {
        type: String,
        required: [true, "UserType is Required"]
    }
    ,
    name: {
        type: String,
        required: [true, 'Name is require']
    },
    email: {
        type: String,
        required: [true, 'Email is require'],
        unique: true,
        validate: validator.isEmail
    },
    Phone: {
        type: String,
        required: [true, 'Phone is require'],
    },
    Password: {
        type: String,
        required: [true, 'Password is require'],
        minlength: [6, "Password Should be greate than 6 Character"],
        select: true,

    },


}, { timestamps: true });
Userschema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
})
Userschema.methods.comaprepass = async function (userPassword, user) {
    const ismatch = await bcrypt.compare(userPassword, user.Password);
    console.log(ismatch);
    return ismatch;
}
Userschema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.secret_Key, { expiresIn: '1d' });
}
export default mongoose.model("'User", Userschema);