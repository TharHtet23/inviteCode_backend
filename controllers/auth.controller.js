import User from "../models/user.model.js"; 
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { fMsg, generateCode, generateTokenAndSetCookie,decode,encode } from "../utils/libby.js"; // Import utility functions

export const register = async (req, res, next) => { 
  try {
    const { username, email, password, confirmPassword } = req.body; // Destructure request body

    if (password !== confirmPassword) { 
      return next(new Error("Password and Confirm Password do not match"));
    }

    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      return next(new Error("User already exists")); 
    }

    const inviteCode = generateCode(); // Generate invite code

    const encryptedPassword = encode(password);// Hash password
    let user = await User.create({ // Create new user
      username,
      email,
      password: encryptedPassword,
      inviteCode,
    });
    
    const returnUser = user.toObject(); // Convert user to plain object
    delete returnUser.password; // Remove password from response
    delete returnUser.__v; // Remove version key from response

    generateTokenAndSetCookie(res, user._id);// Generate token and set cookie

    fMsg(res, "User created successfully", returnUser, 201); 
  } catch (error) {
    next(error); 
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error("User not found"));
    }
    
    if (!decode(password, user.password)) {
      return next(new Error("Invalid password"));
    }
    const returnUser = user.toObject();
    delete returnUser.password;
    delete returnUser.__v;
    generateTokenAndSetCookie(res, user._id);

    fMsg(res, "User logged in successfully", returnUser, 200);
  }catch (error) {
    next(error);
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    fMsg(res, "User logged out successfully", null, 200);
  } catch (error) {
    return next(new Error("Error in logout"));
  }
}