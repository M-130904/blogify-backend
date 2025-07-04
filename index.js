require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./middlewares/errorMiddleware");


require("./config/connectDB")();

// Enable CORS
const cors = require("cors");
app.use(cors());
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

// Middleware to parse JSON
app.use(express.json());

console.log("✅ Server is starting...");

// Request logger
app.use((req, res, next) => {
    console.log(`✅ Incoming request: ${req.method} ${req.url}`);
    next();
});

// Mount only user routes
app.use("/api/v1/users", userRouter);

// Health check or root route
app.get('/', (req, res) => {
  res.send('✅ API is working! Backend is running smoothly.');
});

// Ignore favicon.ico requests (optional but clean)
app.get('/favicon.ico', (req, res) => res.status(204).end());


// Logout endpoint
app.post("/api/v1/users/logout", (req, res) => {
    res.json({ status: "success", message: "Logged out successfully!" });
});

console.log("✅ Routers Loaded!");

// Debug: list all routes
app._router.stack.forEach((middleware) => {
    if (middleware.route) { 
        console.log(`🔹 Route: ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((route) => {
            if (route.route) {
                console.log(`🔹 Route: ${Object.keys(route.route.methods).join(", ").toUpperCase()} ${route.route.path}`);
            }
        });
    }
});

// Handle unknown routes
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot find ${req.originalUrl} on this server`
    });
});

// Global error handler
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
