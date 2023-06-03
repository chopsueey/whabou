import express from "express";
import * as dashboard from "../controllers/dashboardController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

// create / post
dashboardRouter.post("/", dashboard.postProfileData);

// GET ALL PROFILEs

// dashboardRouter.get("/", authMiddleware, dashboard.getAllProfileData);
dashboardRouter.get("/", dashboard.getAllProfileData);

// UPDATE A PROFILE
dashboardRouter.patch("/", dashboard.updateProfileData);

// DELETE PROFILE
dashboardRouter.delete("/", dashboard.deleteProfileData);

// DELETE PROFILE
dashboardRouter.delete("/", dashboard.deleteAllProfilesData);

export default dashboardRouter;