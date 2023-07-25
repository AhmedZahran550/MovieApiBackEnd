import { Router } from "express";
import authToken from '../../middleware/auth.js';
import { validation } from "../../middleware/validation.js";
import { getProfile, hardDelete, updateProfile, softDelete } from "./controller/user.controller.js";
import * as validators from './user.validation.js'
const router = Router();


router.get("/profile", authToken, getProfile);
router.patch("/update", authToken,validation(validators.update), updateProfile);
router.delete("/delete", authToken, hardDelete);
router.patch("/delete", authToken, softDelete);


export default router;
