import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ForumPost",
    required: true,
  },
  action: {
    type: String,
    enum: ["like", "comment", "recommend"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});


module.exports = mongoose.model("UserActivity", userActivitySchema);