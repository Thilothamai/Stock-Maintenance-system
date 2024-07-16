// Importing necessary modules and models
const User = require("../models/usermodel");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const{expressjwt : jwt} = require("express-jwt");
const jwtToken = require('jsonwebtoken');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    //service: "ritrjpm.ac.in,gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        ciphers: 'SSLv3', // Adjust the cipher according to the SMTP server requirements
        minVersion: 'TLSv1', // Specify the minimum TLS version
    },
    auth: {
      user: "13thilothamai@gmail.com", // Enter your Gmail email address
      pass: "Thilo1302@", // Enter your Gmail password
    },
});

// SIGNUP: Registering a new user
exports.signup = (req, res) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    // Creating a new user instance and saving it to the database
    const user = new User(req.body);
    user.save()
        .then(user => {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
            });
        })
        .catch(err => {
            let errorMessage = 'Something went wrong.';
            if (err.code === 11000) {
                errorMessage = 'User already exists, please signin'; 
            }
            return res.status(500).json({ error: errorMessage });
        });
};

// SIGNIN: Authenticating existing user
exports.signin = async (req, res) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    // Checking user credentials and generating JWT token for authentication
    const { email, password } = req.body;
    await User.findOne({ email: `${email}` })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email or Password does not exist"
                });
            }
            // Setting JWT token as a cookie in the browser
            const token = jwtToken.sign({ _id: user._id }, 'shhhhh');
            res.cookie("token", token, { expire: new Date() + 9999 });
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        });
};

// SIGNOUT: Clearing user token
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User has signed out"
    });
};

// Protected Routes
exports.isSignedIn = jwt({
    secret: 'shhhhh',
    userProperty: "auth",
    algorithms: ['HS256']
});

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

// RESET PASSWORD: Resetting user password
exports.resetPassword = async (req, res) => {
    const { email, resetToken, newPassword } = req.body;
    
    // Find user by email and reset token
    const user = await User.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }
  
    // Update user's password
    user.password = newPassword;
    // Clear reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful.' });
};

// FORGOT PASSWORD: Initiating password reset process
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
    
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const resetToken = user.generateResetToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();
    
        const mailOptions = {
          from: "13thilothamai@gmail.com",
          to: email,
          subject: "Password Reset",
          text: `Click the following link to reset your password: ${resetToken}`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
    
          console.log("Email sent:", info.response);
          res.json({ message: "Password reset email sent successfully" });
        });
      } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
};
