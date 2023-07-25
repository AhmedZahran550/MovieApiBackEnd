
import userRouter from "./Modules/user/user.routes.js";
import authRouter from "./Modules/auth/auth.routes.js";
import connectDB from './../DB/connection/connection.js';
import { globalErrorHandler } from "./middleware/errorHandling.js";
import  cors from 'cors'; 



const initApp = (express, app) => {

    connectDB();
    app.use(cors())
    app.use(express.json({}));
    app.get('/', (req, res) => res.send('Hello World!'));
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.all("*", (req, res) => {
        return res.json({ Error: " Not found" });
    });

    app.use(globalErrorHandler);
};
export default initApp;
