import profileModel from "../model/profileModel.js";

// POST / CREATE PROFILE

async function postProfileData(req, res) {
  try {
    const newProfile = profileModel({
      profile: req.body.profile,
    });

    const savedProfile = await newProfile.save();
    res.status(200).json(savedProfile);
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
  postProfileData,
  updateProfileData,
  deleteProfileData,
  deleteAllProfilesData,
};