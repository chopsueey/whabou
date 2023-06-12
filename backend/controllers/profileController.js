import User from "../model/profileModel.js" 
// Profil anzeigen
async function showProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    const userId = req.user.id;

    // Benutzer aus der Datenbank abrufen
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Profil bearbeiten
async function editProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    const userId = req.user.id;

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
};

export {
  showProfile,
  editProfile

}
