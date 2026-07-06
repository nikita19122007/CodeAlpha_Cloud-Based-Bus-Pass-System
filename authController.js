const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// Register User

const registerUser = async (req, res) => {

    try {

        const { fullName, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({

            fullName,

            email,

            phone,

            password: hashedPassword

        });

        res.status(201).json({

            success: true,

            message: "Registration Successful",

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// Login User

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "User Not Found"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Incorrect Password"

            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// User Profile

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    registerUser,

    loginUser,

    getProfile

};
