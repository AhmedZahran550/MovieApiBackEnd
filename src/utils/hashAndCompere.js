
import { compareSync, hashSync } from "bcrypt";



export const hash = (plaintext = "", saltRounds = process.env.SALT_ROUND) => {
    const hashed = hashSync(plaintext, parseInt(saltRounds));
    return hashed;
};

export const compereHash = (plaintext = "", hashedText = "") => {
    const match = compareSync(plaintext, hashedText);
    return match;
};
