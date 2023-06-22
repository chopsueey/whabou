import { createToken } from "../lib/auth.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE

export async function createUserController(req, res, next) {
  console.log("in register", req.body);
  try {
    // hash and salt password
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    // create new user
    const newUser = User(req.body);
    const savedUser = await newUser.save();

    // create profile when user registers
    const newProfile = Profile({
      userName: req.body.userName,
      userId: savedUser._id,
    });
    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "test response, 201 status should be empty",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN

export async function loginController(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const userProfile = await Profile.find({ userId: user._id });
        // console.log(userProfile)
        // console.log(userProfile[0]._id)
        const profileId = userProfile[0]._id
        const token = await createToken({ userId: user._id });
        return res
          .status(200)
          .cookie("jwt", token, { maxAge: 60 * 60 * 1000, httpOnly: true }) // expires after 60 min
          .json({ message: "Login successful", userId: user._id, profileId: profileId });
      }
      return res
        .status(401)
        .json("Zugriff verweigert! Die Anmeldedaten sind falsch.");
    }
    res.status(404).json("Benutzer nicht gefunden");
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// Logout
export async function logoutController(req, res, next) {
  // Clear the cookie by setting it to an empty value and expiring it immediately
  try {
    res
      .status(201)
      .clearCookie("jwt", { httpOnly: true })
      .json({ message: "Logout successful!" });
  } catch (err) {
    next(err);
  }
}
