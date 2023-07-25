import express from 'express';
import initApp from './src/app.router.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const port = process.env.PORT;

initApp(express, app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



