// Importing necessary modules and models
const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const { signin, signup, signout, isSignedIn, forgotPassword, resetPassword } = require("../controllers/authcontroller");

// POST request for user signup
router.post(
    "/signup",
    [
        // Validation for name, email, and password
        check("name", "Name must be 3+ chars long").isLength({ min: 3 }),
        check("email", "Email is required").isEmail(),
        check("password", "Password must contain 8+ chars").isLength({ min: 8 })
    ],
    signup // Call the signup function from the authController
);

// POST request for user signin
router.post(
    "/signin",
    [
        // Validation for email and password
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").isLength({ min: 1 })
    ],
    signin // Call the signin function from the authController
);

// POST request for resetting user password
router.post("/resetpassword", resetPassword);

// POST request for initiating password reset process
router.post("/forgotpassword", forgotPassword);

// GET request for user signout
router.get("/signout", signout);

// Protected Route for testing
router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected route");
});

module.exports = router; // Export the router module