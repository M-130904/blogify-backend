const express = require("express");

const app = express();
const PORT = process.env.PORT || 9080;

// Route to check if server is running
app.get("/", (req, res) => {
  res.send("Blogify server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  