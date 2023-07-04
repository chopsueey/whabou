import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";

// get
// Profil anzeigen
async function showProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    const userId = req.user.userId;
    // Benutzer aus der Datenbank abrufen
    const user = await Profile.findOne({ userId: userId });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// // post

// async function postProfileData(req, res, next) {
//   const { userName, nationality, age, userId } = req.body;

//   try {
//     const newProfile = Profile({
//       userName: userName,
//       nationality: nationality,
//       age: age,
//       userId: userId,
//     });

//     const savedProfile = await newProfile.save();
//     res.status(201).json(savedProfile);
//   } catch (err) {
//     next(err);
//   }
// }

// patch
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

// put
async function editProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    const userId = req.user.userId;

    // Aktualisierte Profildaten aus dem Request-Body erhalten
    const updatedProfile = req.body;

    // Benutzerprofil in der Datenbank aktualisieren
    const user = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// delete account
async function deleteAccount(req, res, next) {
  try {
    const accountId = req.user.userId;
    const deletedAccount = await User.findByIdAndDelete(accountId);
    console.log(deletedAccount);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account nicht gefunden" });
    }

    res.status(200).json({ message: "Account erfolgreich gelöscht" });
  } catch (err) {
    next(err);
  }
}

export {
  showProfile,
  editProfile,
  // postProfileData,
  updateProfileData,
  deleteAccount,
};
