import express from "express";
import * as dashboard from "../controllers/dashboardController.js";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

// GET
// dashboardRouter.get("/", dashboard.getAllProfileData);
dashboardRouter.get("/", dashboard.getAllQuestions);
dashboardRouter.get("/questions", questionController.getAllQuestions);
dashboardRouter.get("/profile", profileController.showProfile);

// POST
// dashboardRouter.post("/", dashboard.postProfileData);
   dashboardRouter.post("/",  dashboard.postQuestion);
/*dashboardRouter.post("/", questionController.createQuestion);*/

// UPDATE
dashboardRouter.patch("/", dashboard.updateProfileData);
dashboardRouter.patch("/profile", profileController.editProfile);

// DELETE
dashboardRouter.delete("/", dashboard.deleteProfileData);
//dashboardRouter.delete("/profile", profileController.deleteProfileData);

// DELETE ALL
// dashboardRouter.delete("/", dashboard.deleteAllProfilesData);


export default dashboardRouter;
