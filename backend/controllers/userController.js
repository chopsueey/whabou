import { createToken } from "../lib/auth.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE

export async function createUserController(req, res) {
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
      res.status(500).json(error);
   }
}

// LOGIN

export async function loginController(req, res) {
   try {
      const user = await userModel.findOne({email:req.body.email});
      if (user){
         const isMatch = await bcrypt.compare(req.body.password, user.password);
         if (isMatch){
            const token = await createToken({customerId: user.customerId, userId:user._id});
            return res.status(200).cookie("jwt", token, {httpOnly:true}).send({msg:"Anmeldung erfolgreich!"});
         }
         return res.status(401).json("Zugriff verweigert! Die Anmeldedaten sind falsch.");
      }
      res.status(404).json("Benutzer nicht gefunden");
   } catch (error) {
      res.status(500).json(error);
   }
}

// POST 
// const response = await userModel.findOneAndUpdate({customerId:req.user.customerId});

// GET USER DATA
export async function getUserDataController(req, res) {
   try {
      const response = await userModel.findOne({customerId:req.user.customerId});
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json(error);
   }
}

// DELETE ALL TASKS
// userModel.deleteMany({});
  
   
