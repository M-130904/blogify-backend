const express = require('express');
const router = express.Router();

// Sample route
router.get('/', (req, res) => {
    res.send('Category Router working!');
});

module.exports = router;
