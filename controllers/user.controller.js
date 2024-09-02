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