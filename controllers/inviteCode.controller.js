import User from "../models/user.model.js";
import { fMsg } from "../utils/libby.js";

export const joinByInviteCode = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const currentUser = await User.findById(req.userId);
    if(currentUser.invitedBy){
      return next(new Error("You have already joined by invite code"));
    }

    if(currentUser.inviteCode === inviteCode){
      return next(new Error("You cannot invite yourself"));
    }
    const user = await User.findOne({ inviteCode });
    if (!user) {
      return next(new Error("Invite code not found "));
    }
    user.inviteCount = user.inviteCount + 1;
    user.points = user.points + 100;
   
    currentUser.invitedBy = user._id;

    await user.save();
    await currentUser.save();
    const returnUser = user.toObject();
    delete returnUser.password;
    delete returnUser.__v;
    fMsg(
      res,
      "User joined successfully By Class Code Successfully",
      returnUser,
      200
    );
  } catch (error) {
    next(error);
  }
};
