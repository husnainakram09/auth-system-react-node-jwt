import express, { Express, Request, Response } from 'express';
import cors from "cors"; // here is one error in cors
// const cors = require('cors')
import dotenv from 'dotenv'
import userRoute from './route/user';
import configRoute from './route/formConfig';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.options("*", cors());
app.use(express.json());


//Route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/dashboard-config", configRoute);

//base route
app.get("/", (req: Request, res: Response) => {
  res.send("Node application is running!");
});

// // Add a list of allowed origins.
// // If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = [`http://localhost:${port}`];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});