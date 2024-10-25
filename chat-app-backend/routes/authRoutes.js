const express = require('express');
const { sendOtp, verifyOtp, registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
