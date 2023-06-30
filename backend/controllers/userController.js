import { createToken } from "../lib/auth.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE**********************************************************************************************************************

export async function createUserController(req, res, next) {
  try {
    // HASH AND SALT PASSWORD*********************************************************************************************************
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    // CREATE A NEW USER **************************************************************************************************************
    const newUser = User(req.body);
    const savedUser = await newUser.save();

    // CREATE A PROFILE WHEN A USER REGISTERS******************************************************************************************
    const newProfile = Profile({
      userName: req.body.userName,
      userId: savedUser._id,
    });
    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "Test response, 201 status should be empty.",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN*************************************************************************************************************************************

export async function loginController(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const userProfile = await Profile.findOne({ userId: user._id });
        // console.log(userProfile)
        const profileId = userProfile._id;
        const token = await createToken({ userId: user._id });
        return res
          .status(200)
          .cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }) // expires after 24 hours
          .cookie("isLoggedIn", true, { maxAge: 24 * 60 * 60 * 1000 })
          .json({
            message: "Login successful.",
            userId: user._id,
            profileId: profileId,
          });
      }
      return res
        .status(401)
        .json("Access denied! The login details are incorrect.");
    }
    res.status(404).json("User not found");
  } catch (error) {
    next(error);
  }
}

// LOGOUT*************************************************************************************************************************************
export async function logoutController(req, res, next) {
  // Clear the cookie by setting it to an empty value and expiring it immediately
  try {
    res
      .status(201)
      .clearCookie("jwt", { httpOnly: true })
      .clearCookie("isLoggedIn")
      .json({ message: "Logout successful." });
  } catch (err) {
    next(err);
  }
}
