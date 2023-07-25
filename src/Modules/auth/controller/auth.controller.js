
// import jwt from "jsonwebtoken";
import { userModel } from "../../../../DB/models/user/user.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";
import { genToken } from "../../../utils/generateToken.js";
import sendEmail from "../../../services/sendEmail.js";
import { compereHash, hash } from './../../../utils/hashAndCompere.js';






export const singUp = asyncHandler(async (req, res, next) => {
    const { email, age, password, first_name ,last_name } = req.body;
    const founded = await userModel.findOne({ email});
    if (founded) {
        return next(new Error("Email already exist...."));
    } else {
        const hashed = hash(password);
        const user = await userModel.create({ first_name ,last_name, email, age, password: hashed });
        // return res.json({ message: "done" });
        const token = genToken({ data: { id: user._id, email: user.email } });
        const url = `${req.protocol}://${req.headers.host}/auth/verify/${token}`;
        await sendEmail(email, "verify Email", `<a href = ${url}> Click to verify your Email</a>`);
        return res.json({ message: "done" });
    }
}
);


export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, isActive: true });
    if (!user) {
        return next(new Error("Email does`t Exist "));
    }
    if (!user.verifyEmail) {
        const token = genToken({ data: { id: user._id, email: user.email } });
        const url = `${req.protocol}://${req.headers.host}/auth/verify/${token}`;
        await sendEmail(email, "verify Email", `<a href = ${url}> Click to verify your Email</a>`);
        return next(new Error("you need to verify first check your Email for  Verify link"));
    }
    const checkPassword = compereHash(password, user.password);
    if (!checkPassword) {
        return next(new Error("Wrong password ... "));
    }
    const token = genToken({ data: { id: user._id, email: user.email, name: user.name } });
    return res.json({ message: "done", token });
});



// update user password 
export const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user?.id);
    const match = compereHash(oldPassword, user.password);
    if (!match) {
        return next(new Error("old Password is Wrong "));
    }
    const hashed = hash(newPassword);
    user.password = hashed;
    await user.save();
    return res.json({ message: "done" });

});

//  user forget password 
export const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new Error("Email does`t exist .... enter a valid Email"));
    }
    const code = Math.floor(Math.random() * (9001) + 1000);
    user.code = hash(JSON.stringify(code));
    await user.save();
    await sendEmail(email, "Rest password Code ", `<h1>verifying code is : ${code}</h1>`);
    return res.json({ message: "Check your Email for The  Rest Code"});
});

// check code to rest password 
export const codeCheck = asyncHandler(async (req, res, next) => {
    const {email , code} = req.body
    const user = await userModel.findOne({email});
    if (!user) {
        return next(new Error("Email does`t exist .... enter a valid Email"));
    }
    const match = compereHash(code , user.code);
    if (!match) {
        return next(new Error("verify code  is Wrong "));
    }
    const token = genToken({ data: { id: user._id } });
    return res.json({ message: "done" , token});
});



//  Rest Password 
export const RestPassword = asyncHandler(async (req, res, next) => {
    const {password } = req.body;
    const hashed = hash(password);
    const user = await userModel.findByIdAndUpdate(req.user?.id ,{password:hashed , $unset:{code:1}});
    return res.json({ message: "done" });
});


// verify user Email ;
export const verifyEmail = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user?.id, { verifyEmail: true }, { new: true }).select("isActive verifyEmail fullName email");
    return  res.redirect('http://localhost:3000/logIn');
});




