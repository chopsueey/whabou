import express from "express";
import * as dashboard from "../controllers/dashboardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

// GET
// dashboardRouter.get("/", dashboard.getAllProfileData);
dashboardRouter.get("/", dashboard.getAllQuestions);

// POST
// dashboardRouter.post("/", dashboard.postProfileData);
dashboardRouter.post("/", dashboard.postQuestion);

// UPDATE
dashboardRouter.patch("/", dashboard.updateProfileData);

// DELETE
dashboardRouter.delete("/", dashboard.deleteProfileData);

// DELETE ALL
dashboardRouter.delete("/", dashboard.deleteAllProfilesData);

export default dashboardRouter;
