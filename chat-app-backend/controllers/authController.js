const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const otpStorage = {}; // Temporary storage for OTPs (for demo purposes)

const sendOtp = (req, res) => {
    const { mobile } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    otpStorage[mobile] = otp;
    console.log(`OTP for ${mobile}: ${otp}`);
    res.json({ message: `OTP sent to ${mobile}`, otp });
};



const verifyOtp = (req, res) => {
    const { mobile, otp } = req.body;
    if (otpStorage[mobile] === parseInt(otp, 10)) {
        delete otpStorage[mobile];
        res.json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

module.exports = { sendOtp, verifyOtp, registerUser, loginUser };




const registerUser = async (req, res) => {
    const { mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ mobile, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
};




const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Assuming you have a User model
const loginUser = async (req, res) => {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
};


module.exports = { sendOtp, verifyOtp, registerUser, loginUser };
