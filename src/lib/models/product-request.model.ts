import mongoose from "mongoose";

const productRequestSchema = new mongoose.Schema({
  id: { type: String, require: true },
  title: { type: String, require: true },
  category: { type: String, require: true },
  upvotes: { type: Number },
  status: { type: Boolean, require: true },
  description: { type: String },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductRequest =
  mongoose.models.ProductRequest ||
  mongoose.model("ProductRequest", productRequestSchema);

export default ProductRequest;
