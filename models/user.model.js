import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      unique: true,
    },
    inviteCount: {
      type: Number,
      default: 0,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    points: {
      type: Number,
      default: 0,
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    },
    completedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }],
});

const User = mongoose.model("User", userSchema);

export default User;