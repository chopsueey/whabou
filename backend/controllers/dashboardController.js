// imported the new likeModel
import likeModel from "../model/likeModel.js";
import profileModel from "../model/profileModel.js";
import questionModel from "../model/questionModel.js";

// POST / CREATE PROFILE

async function postProfileData(req, res) {
  const { userName, nationality, age, user } = req.body;

  try {
    const newProfile = profileModel({
      userName: userName,
      nationality: nationality,
      age: age,
      // added the userId for the new profileModel
      user: user,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    next(error); 
    //res.json(error);
  }
}

// POST QUESTION

async function postQuestion(req, res) {
  const { question, user } = req.body;

  try {
    const newQuestion = questionModel({
      question: question,
      // added the userId for the new questionModel
      user: user,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    next(error); 
    //res.json(error);
  }
}

// new LIKE controller for the new likeModel
// which needs the userId and the questionId which was liked
// POST LIKE
async function postLike(req, res) {
  const { user, question } = req.body;
  try {
    const newLike = likeModel({
      user: user,
      question: question,
    });
    const savedLike = await newLike.save();
    res.status(201).json(savedLike);
  } catch (err) {
    next(error); 
    //res.json(err);
  }
}

// GET ALL PROFILES
async function getAllProfileData(req, res, next) {
  try {
    const allProfileItems = await profileModel.find({});
    res.status(200).json(allProfileItems);
  } catch (error) {
    next(error);  
    //res.json(error);
  }
}

// GET ALL QUESTIONS
async function getAllQuestions(req, res, next) {
  try {
    const allQuestions = await questionModel.find({});
    res.status(200).json(allQuestions);
  } catch (error) {
    next(error); 
    //res.json(error);
  }
}

// UPDATE A PROFILE
async function updateProfileData(req, res, next) {
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
    next(error); 
    //res.json(error);
  }
  //console.log(req.params.profileId);
}

// DELETE PROFILE
async function deleteProfileData(req, res, next) {
  const deleteId = req.params.profileId;
  try {
    await profileModel.findByIdAndDelete(deleteId);
    res.status(200).json("Profile GELÖSCHT!");
  } catch (error) {
    next(error); 
    //res.json(error);
  }
}

// DELETE ALL PROFILES

async function deleteAllProfilesData(req, res, next) {
  try {
    await profileModel.deleteMany({});
    res.status(200).json("ALLE Profiles wurde GELÖSCHT!");
  } catch (error) {
    next(error); 
    //res.json(error);
  }
}

async function deleteAccount(req, res) {
  try {
    const accountId = req.params.id;

    const deletedAccount = await profileModel.findByIdAndDelete(accountId);

    if (!deletedAccount) {
      return res.status(404).json({ error: "Account nicht gefunden" });
    }

    res.status(200).json({ message: "Account erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Löschen des Accounts" });
  }
}

export {
  getAllProfileData,
  getAllQuestions,
  postProfileData,
  postQuestion,
  postLike,
  updateProfileData,
  deleteProfileData,
  deleteAllProfilesData,
  deleteAccount,
};

