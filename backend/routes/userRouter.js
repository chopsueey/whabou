import express from "express";
import * as user from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// create / post
userRouter.post("/user/register", user.createUserController);

// login
userRouter.post("/user/login", user.loginController);

// Pay in
userRouter.patch("/user/transaction/postMoney", authMiddleware, user.payInController);

// Charge off
userRouter.patch("/user/transaction/getMoney", authMiddleware, user.chargeOffController);

// Read user data

userRouter.get("/user/data", authMiddleware, user.getUserDataController);

// get / read
userRouter.get("/user", user.getAllUsersController);

// delete all
userRouter.delete("/user", user.deleteAllUsersController);

export default userRouter;
