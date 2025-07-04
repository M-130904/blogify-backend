const mongoose = require("mongoose");

// Define Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    bio: { type: String, trim: true },
    location: { type: String, trim: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    accountVerificationToken: { type: String },
    accountVerificationExpires: { type: Date },
}, { timestamps: true });

// ✅ Correctly export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
