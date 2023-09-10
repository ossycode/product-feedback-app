import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    avatar: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
