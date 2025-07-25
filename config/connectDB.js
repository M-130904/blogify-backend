require("dotenv").config();
const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

