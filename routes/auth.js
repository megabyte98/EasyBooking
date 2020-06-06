const express = require("express");
const auth = require("../middleware/auth")
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// to get current user profile
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
});


// to login user
router.post("/", [
    check("email", "Please enter a valid EmailId").isEmail(),
    check("password", "Password is required").exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    else res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message)
        }
    },
]);

module.exports = router;
