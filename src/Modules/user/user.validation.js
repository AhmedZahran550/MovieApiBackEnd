import joi from "joi";

export const update = {
    body:joi.object(
    {
        fullName:joi.string().required(),
        phone:joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),
      
    }
).required()}