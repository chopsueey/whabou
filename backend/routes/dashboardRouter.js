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


/*dashboardRouter.post("/", questionController.createQuestion);*/

//dashboardRouter.post("/", dashboard.postProfileData);
dashboardRouter.post("/", dashboard.postQuestion);
// added the router for the new postLike controller
dashboardRouter.post("/:id", dashboard.postLike);


// UPDATE
// dashboardRouter.patch("/", dashboard.updateProfileData);
dashboardRouter.patch("/profile", profileController.editProfile);

// DELETE
dashboardRouter.delete("/", dashboard.deleteProfileData);
//dashboardRouter.delete("/profile", profileController.deleteProfileData);

// DELETE ALL
// dashboardRouter.delete("/", dashboard.deleteAllProfilesData);


// ----- Profile -----

// -- get --
// dashboardRouter.get("/profile/:id", dashboard.getAllQuestions);

// -- post --
// dashboardRouter.post("/profile", dashboard.postQuestion);

// -- update --
// dashboardRouter.patch("/profile", dashboard.updateProfileData);

// -- delete --
dashboardRouter.delete("/profile/:id", dashboard.deleteAccount);

export default dashboardRouter;
