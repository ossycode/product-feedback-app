import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    title: { type: String, require: true },
    category: { type: String, require: true },
    upvotes: { type: Number },
    status: { type: String, require: true },
    description: { type: String, require: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Feedback =
  mongoose.models.ProductRequest ||
  mongoose.model("ProductRequest", FeedbackSchema);

export default Feedback;
