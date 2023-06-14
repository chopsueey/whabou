import express from "express";
import * as user from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const userRouter = express.Router();


// create / post
userRouter.post("/register", user.createUserController);

// login
userRouter.post("/login", user.loginController);

// userRouter.get("/user/data", authMiddleware, user.getUserDataController);

// logout
userRouter.post("/logout", user.logoutController);

export default userRouter;
