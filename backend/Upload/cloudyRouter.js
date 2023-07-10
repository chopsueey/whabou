import express from "express";

import {
  getAllProfiles,
  createProfile,
  deleteProfile,
} from "../controllers/profileControllers.js";

const profileRouter = express.Router();

profiletRouter.get("/", getAllProfiles);

profileRouter.post("/", createProfile);

profileRouter.delete("/:id", deleteProfile);

export default profileRouter;
