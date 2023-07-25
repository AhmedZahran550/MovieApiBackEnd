import { Router } from 'express';
import authToken ,{ EmailVerifyToken } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { codeCheck, forgetPassword, login, RestPassword, singUp, updatePassword, verifyEmail } from './controller/auth.controller.js';
import * as validators from './auth.validation.js';


const routes = Router();

routes.post("/signup",validation(validators.singUp), singUp);
routes.post("/login",validation(validators.login), login);
// ============ forget password ================
routes.post("/forgetPass",validation(validators.forgetPass), forgetPassword);
routes.post("/code", codeCheck);
routes.patch("/RestPass",authToken, validation(validators.RestPassword), RestPassword);
// ============================================
routes.patch("/updatePass", authToken,validation(validators.updatePassword), updatePassword);
routes.get("/verify/:token", EmailVerifyToken, verifyEmail);


export default routes;
