const jwt = require("jsonwebtoken");
const User = require("../models/User/User");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: "fail", message: "Unauthorized: No token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid user" });
        }

        req.user = user; // attach user to request
        next();

    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
    }
};

module.exports = verifyToken;
