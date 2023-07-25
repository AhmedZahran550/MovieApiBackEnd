import joi from "joi";

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const singUp = {
   body:joi.object(
    {
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().email().required(),
        age: joi.number().min(12).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required(),
        cpassword: joi.string().valid(joi.ref('password')).required()
    }
).required()}; 



export const login = {
   body:joi.object(
    {
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required(),
      
    }
).required()};




export const updatePassword = {
    body:joi.object(
    {
        oldPassword: joi.string().required(),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required(),
        cpassword: joi.string().valid(joi.ref('newPassword')).required()
    }
).required()};

export const RestPassword = {
    body:joi.object(
    {
        password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)).required(),
        cpassword: joi.string().valid(joi.ref('password')).required()
    }
).required()};


export const forgetPass = {
    body:joi.object(
    {
        email: joi.string().email().required(),
    }
).required()};





