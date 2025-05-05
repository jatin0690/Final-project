const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const createError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user) {
            return next(new createError("User already exists", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        const token = jwt.sign({ _id: newUser._id }, "secretKey123", {
            expiresIn: '90d',
        });
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token,
            name:req.body.name,
            email:req.body.email,
            role:'user',
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new createError("User not found!", 400));
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new createError("Invalid email or password", 401));
        }
        const token = jwt.sign({ id: user._id }, "secretKey123", {
            expiresIn: '90d',
        });
        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login };
