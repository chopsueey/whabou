import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import * as feedbackController from "../controllers/feedbackController.js";

const dashboardRouter = express.Router();

// DASHBOARD
// GET
dashboardRouter.get("/feed/sort", questionController.getLatestQuestion);
// POST

// UPDATE

// DELETE

// DASHBOARD/PROFILE

// changed the access to the userId to req.user.userId (which is from the jwt cookie)
// so that we don't need send the :userId as params or query

// get
dashboardRouter.get("/profile", profileController.showProfile);
// dashboardRouter.get("/profile", profileController.showUser);

// post
dashboardRouter.post("/profile", profileController.postProfileData);

// patch
dashboardRouter.patch("/profile", profileController.updateProfileData);

// put
dashboardRouter.put("/profile", profileController.editProfile);

// delete
dashboardRouter.delete("/profile", profileController.deleteAccount);
//dashboardRouter.delete("/profile", profileController.deleteProfileData);

// DASHBOARD/MYQUESTIONS

// get
dashboardRouter.get("/myquestions", questionController.getAllQuestions);
dashboardRouter.get("/myquestions/:id", questionController.getQuestion);

// post
dashboardRouter.post("/myquestions", questionController.postQuestion);

// LIKE
// dashboardRouter.post("/:id", dashboard.postLike);

//DASHBOARD/FEEDBACK

//post
dashboardRouter.post("/feedback", feedbackController.postFeedback);

//post like
dashboardRouter.post("/feedback", feedbackController.postLike);

export default dashboardRouter;
