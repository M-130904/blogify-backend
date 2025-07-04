const globalErrorHandler = (err, req, res, next) => {
    console.error("🔥 Global Error Handler:", err.stack);

    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Something went wrong"
    });
};

module.exports = globalErrorHandler;
