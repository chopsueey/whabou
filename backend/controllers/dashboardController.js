import profileModel from "../model/profileModel.js";
import questionModel from "../model/questionModel.js";

// POST / CREATE PROFILE

async function postProfileData(req, res) {
  const { userName, nationality, age } = req.body;
  try {
    const newProfile = profileModel({
      userName: userName,
      nationality: nationality,
      age: age,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.json(error);
  }
}

// POST QUESTION

async function postQuestion(req, res) {
  const { question } = req.body;
  try {
    const newQuestion = questionModel({
      Frage: question,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.json(error);
  }
}

// GET ALL PROFILES
async function getAllProfileData(req, res) {
  try {
    const allProfileItems = await profileModel.find({});
   res.status(200).json(allProfileItems);
  } catch (error) {
    res.json(error);
  }
}

// GET ALL QUESTIONS
async function getAllQuestions(req, res) {
  try {
    const allQuestions = await questionModel.find({});
    res.status(200).json(allQuestions);
  } catch (error) {
    res.json(error);
  }
}

// UPDATE A PROFILE
async function updateProfileData(req, res) {
  const updateId = req.params.profileId;
  try {
    const updatedItem = await profileModel.findByIdAndUpdate(
      updateId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.json(error);
  }
  //console.log(req.params.profileId);
}

// DELETE PROFILE
async function deleteProfileData(req, res) {
  const deleteId = req.params.profileId;
  try {
    await profileModel.findByIdAndDelete(deleteId);
    res.status(200).json("Profile GELÖSCHT!");
  } catch (error) {
    res.json(error);
  }
}

// DELETE ALL PROFILES

async function deleteAllProfilesData(req, res) {
  try {
    await profileModel.deleteMany({});
    res.status(200).json("ALLE Profiles wurde GELÖSCHT!");
  } catch (error) {
    res.json(error);
  }
}

export {
  getAllProfileData,
  getAllQuestions,
  postProfileData,
  postQuestion,
  updateProfileData,
  deleteProfileData,
  deleteAllProfilesData,
};
