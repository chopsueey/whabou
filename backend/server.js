import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";

import connectDB from "./database/connectDB.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

// Start MIDDLEWARES
// https://wabooo.onrender.com
// http://localhost:5000
app.use(cors({ credentials: true, origin: "https://wabooo.onrender.com" }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/dist")));
app.get("/", (req, res) => res.sendFile(__dirname + "/dist/index.html"));
app.use("/", userRouter);
app.use("/dashboard", authMiddleware, dashboardRouter);

// Operational error handling
//app.get("/", (req, res, next) => {
// mimic an error by throwing an error to break the app!
//throw new Error("Something went wrong");
//res.send("Welcome to main route!")
//})

//to send a response on any error
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

(async () => {
  try {
    await connectDB(connectionString);
    console.log("Mit MONGODB verbunden!");
    //
    app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// startServer();
