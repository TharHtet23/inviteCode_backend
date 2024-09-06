import User from "../models/user.model.js";
import { fMsg } from "../utils/libby.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    fMsg(res, "Users fetched successfully", users, 200);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    console.log(user);
    fMsg(res, "User fetched successfully", user, 200);
  } catch (error) {
    next(error);
  }
};