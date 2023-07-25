import { userModel } from "../../../../DB/models/user/user.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";



export const getProfile = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user?.id, { password: 0 });
    return res.json({ message: "done", user });
});

export const hardDelete = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.user?.id);
    return res.json({ message: "done" });
});

export const softDelete = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(req.user?.id, { isActive: false }, { new: true }).select("isActive fullName email");
    return res.json({ message: "done", user });
});


export const updateProfile = asyncHandler(async (req, res, next) => {
    const { phone, fullName } = req.body;
    const user = await userModel.findByIdAndUpdate(req.user?.id, { phone, fullName }, { new: true }).select('fullName updatedAt email phone');
    return res.json({ message: "done", user });
});