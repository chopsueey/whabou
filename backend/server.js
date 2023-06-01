import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import connectDB from "./database/connectDB.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

// Start MIDDLEWARES
app.use(cors({credentials:true, origin:"http://localhost:5173"}));
app.use(express.json());

app.use("/api", userRouter);
app.use("/dashboard", dashboardRouter);

(async () => {
   try {
      await connectDB(connectionString);
      console.log("Mit MONGODB verbunden!");
      //
      app.listen(port, () => {
         console.log(`Server läuft auf Port: ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
})();

// startServer();
