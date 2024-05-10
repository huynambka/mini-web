const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if username or email exists
    const userExist = await User.findOne({
        username: username,
    });
    if (userExist) {
        return next(new Error('Username or email already exists!'));
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashedPassword,
    };
    // Create new user
    const user = await User.create(newUser);
    if (!user) {
        return next(new Error('Something went wrong!'));
    }
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'User registered!',
        data: {
            username,
        },
    });
};
const login = async (req, res, next) => {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username: username });
    if (!existedUser) {
        return next(new Error('Username does not exist!'));
    }
    const matchPassword = await bcrypt.compare(password, existedUser.password);
    if (!matchPassword) {
        return next(new Error('Wrong password!'));
    }

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_LIFETIME,
    });
    res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: 'User logged in!',
        data: {
            username,
            token,
        },
    });
};
module.exports = {
    register,
    login,
};
