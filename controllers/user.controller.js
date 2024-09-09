import User from "../models/user.model.js";
import { fMsg } from "../utils/libby.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    const filteredUsers = users.map(user => ({
      name: user.username,
      inviteCount: user.inviteCount
    }));

    fMsg(res, "Users fetched successfully", {
      users: filteredUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers
    }, 200);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    fMsg(res, "User fetched successfully", user, 200);
  } catch (error) {
    next(error);
  }
};