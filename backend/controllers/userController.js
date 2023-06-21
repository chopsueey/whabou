import { createToken } from "../lib/auth.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE

export async function createUserController(req, res, next) {
  console.log("in register", req.body);
  try {
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;
    const newUser = userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// LOGIN

export async function loginController(req, res, next) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = await createToken({ userId: user._id });
        return res
          .status(200)
          .cookie("jwt", token, { maxAge: 30 * 60 * 1000, httpOnly: true }) // expires after 30 min
          .json({ message: "Login successful", userId: user._id });
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

// POST
// const response = await userModel.findOneAndUpdate({customerId:req.user.customerId});

// POST SOME MONEY
export async function payInController(req, res, next) {
  try {
    const response = await userModel.findOneAndUpdate(
      { customerId: req.user.customerId },
      { balance: +req.body.balance }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// GET USER DATA
export async function getUserDataController(req, res, next) {
  try {
    const response = await userModel.findOne({
      customerId: req.user.customerId,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// DELETE ALL TASKS
// userModel.deleteMany({});

// GET SOME MONEY
export async function chargeOffController(req, res, next) {
  try {
    const response = await userModel.findOneAndUpdate(
      { customerId: req.user.customerId },
      { balance: +req.body.balance }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// GET ALL TASKS
export async function getAllUsersController(req, res, next) {
  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
    //res.status(500).json(error);
  }
}

// DELETE ALL TASKS

// Logout
export async function logoutController(req, res, next) {
  // res.status(201).json(allUsers);
  // Clear the cookie by setting it to an empty value and expiring it immediately
  try {
    res.status(201).clearCookie("jwt", { httpOnly: true }).json();
  } catch (err) {
    next(err);
  }

  // Redirect or respond as needed
  // res.redirect('/login'); // Example redirect to login page
}
