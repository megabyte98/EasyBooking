const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")
const config = require("config");
const router = express.Router();


// route to register user
router.post(
    "/",
    [
        check("firstName", "First Name is required").not().isEmpty(),
        check("lastName", "Last Name is required").not().isEmpty(),
        check("email", "Please enter a valid EmailId").isEmail(),
        check("password", "Password should have min 6 characters").isLength({
            min: 6,
            max: 32,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "user already exists" }] });
            }

            user = new User({
                firstName,
                lastName,
                email,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
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
            console.error(err.message);
            res.status(500).send("server Error");
        }
    }
);

module.exports = router;
