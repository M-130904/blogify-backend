const express = require('express');
const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.send('Post route working!');
});

module.exports = router;
