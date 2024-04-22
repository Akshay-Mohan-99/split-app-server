const express = require('express');
const { authLogin, sendVerifySms } = require('../controllers/auth');

const router = express.Router();

router.post('/send-verify', sendVerifySms);
router.post('/sign-up', authLogin);

module.exports = router;
