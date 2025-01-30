const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Express.js!' });
});
router.get('/t', (req, res) => {
    res.json({ message: 'Welcome to Express.js!' });
});

module.exports = router;