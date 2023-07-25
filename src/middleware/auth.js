import jwt from "jsonwebtoken";
import { userModel } from './../../DB/models/user/user.model.js';
import { asyncHandler } from './errorHandling.js';

const authToken = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER)) {
        return next(new Error("in-valid Bearer token"));
    }
    const token = authorization.split(process.env.BEARER)[1];
    if (!token) {
        return next(new Error('in-valid token'));
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    if (!decoded?.id) {
        return next(new Error(" in-valid payload "));
    }
    const user = await userModel.findById(decoded?.id, { fullName: 1, email: 1, age: 1 });
    if (!user) {
        return next(new Error(" you are`t registered .... signUp "));
    }
    req.user = user;
    return next();
});


export const EmailVerifyToken = asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
        return next(new Error('in-valid token'));
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    if (!decoded?.id) {
        return next(new Error(" in-valid payload "));
    }
    const user = await userModel.findById(decoded?.id, { fullName: 1, email: 1, age: 1 });
    if (!user) {
        return next(new Error(" you are`t registered .... signUp "));
    }
    req.user = user;
    return next();
})


export default authToken;