import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";

// get
// Profil anzeigen
// FIND/SHOW PROFILE********************************************************************************************
async function showProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    // Assumption: userid is available in req.user object
    const userId = req.user.userId;
    // Benutzer aus der Datenbank abrufen
    // Get users from the database
    const user = await Profile.findOne({ userId: userId });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// POST PROFILE*******************************************************************************************
async function postProfileData(req, res, next) {
  const { userName, country, birthyear, userId } = req.body;

  try {
    const newProfile = Profile({
      userName: userName,
      country: country,
      birthyear: birthyear,
      userId: userId,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (err) {
    next(err);
  }
}

// UPDATE PROFILE***************************************************************************************************
async function updateProfileData(req, res, next) {
  const updateId = req.user.userId;
  try {
    const updatedItem = await Profile.findOneAndUpdate(
      { userId: updateId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
}

// EDIT PROFILE****************************************************************************************************
async function editProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    // Assumption: userid is available in req.user object
    const userId = req.user.userId;

    // Aktualisierte Profildaten aus dem Request-Body erhalten
    // Get updated profile data from request body
    const updatedProfile = req.body;

    // Benutzerprofil in der Datenbank aktualisieren
    // Update user profile in database
    const user = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// DELETE ACCOUNT***************************************************************************************************
async function deleteAccount(req, res, next) {
  try {
    const accountId = req.user.userId;
    const deletedAccount = await User.findByIdAndDelete(accountId);
    console.log(deletedAccount);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json({ message: "Account successfully deleted" });
  } catch (err) {
    next(err);
  }
}

export {
  showProfile,
  editProfile,
  postProfileData,
  updateProfileData,
  deleteAccount,
};
