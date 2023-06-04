import express from "express";
import * as user from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const userRouter = express.Router();


// create / post
userRouter.post("/user/register", user.createUserController);

// login
userRouter.post("/user/login", user.loginController);

// userRouter.get("/user/data", authMiddleware, user.getUserDataController);

export default userRouter;
