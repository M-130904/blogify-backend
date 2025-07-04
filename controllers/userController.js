const User = require("../models/User/User"); // ✅ Ensure correct path
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../utils/AppError");

const blacklist = new Set(); // ✅ In-memory store for blacklisted tokens

// ✅ Register function
exports.register = catchAsync(async (req, res, next) => {
    console.log("✅ Incoming Request:", req.body);
    
    const { username, email, password, role } = req.body;

    //! Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return next(new AppError("Username or email is already taken.", 400));

    //! Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    //! Create new user
    const newUser = await User.create({ username, email, password: hashedPassword, role: role || "user" });

    res.status(201).json({
        status: "success",
        message: "User registered successfully!",
        user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        },
    });
});

// ✅ Login function
exports.login = catchAsync(async (req, res, next) => {
    console.log("✅ Login Request:", req.body);
    
    const { email, password } = req.body;

    //! 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("Invalid email or password.", 400));

    //! 2️⃣ Compare hashed password with entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("Invalid email or password.", 400));

    //! 3️⃣ Update Last Login Time
    user.lastLogin = Date.now();
    await user.save();

    //! 4️⃣ Send Success Response with JWT Token
    res.status(200).json({
        status: "success",
        message: "Login successful!",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            lastLogin: user.lastLogin,
        },
        token: generateToken(user),
    });
});

// ✅ Profile function
exports.getProfile = catchAsync(async (req, res, next) => {
    //! Fetch user from DB using ID stored in JWT
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) return next(new AppError("User not found.", 404));

    res.json({
        status: "success",
        message: "Profile fetched successfully!",
        user,
    });
});
//logout
exports.logoutUser = async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ status: "fail", message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Add token to blacklist
        blacklist.add(token);
        console.log("🚫 Blacklisted Token:", token);

        res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
};


// ✅ Middleware to Check Blacklisted Tokens
exports.isTokenBlacklisted = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (blacklist.has(token)) {
        return res.status(401).json({ status: "fail", message: "Token has been revoked. Please log in again." });
    }
    next();
};

// ✅ Export blacklist so it can be used in other files
exports.blacklist = blacklist;
