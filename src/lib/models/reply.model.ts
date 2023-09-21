import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  id: { type: String, require: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  replyingTo: { type: String, required: true },
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
